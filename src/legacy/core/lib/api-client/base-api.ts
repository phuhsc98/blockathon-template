import * as grpcWeb from 'grpc-web';

import { noobj } from '../constants/constants';
import { REACT_APP_BASE_API } from '../constants/env';
import { useStoreToken } from '../store';

type GRPCCallback<
  Res extends { toObject: (includeInstance?: boolean) => As },
  As
> = (error: grpcWeb.RpcError, res: Res) => void;

export interface BaseApiOptions {
  url?: string;
  token?: string;
  lang?: string;
}

export interface RequestOptions {
  noAuth?: boolean;
  /**
   * this `metadata` is used for each the `grpc-web` request
   */
  metadata?: Metadata;
}

export interface Metadata {
  [key: string]: string;
}

export class BaseApi<S> {
  static readonly DEV_TOKEN = '';
  static readonly DEFAULT_URL = REACT_APP_BASE_API; //'http://192.168.11.71:10000'; //REACT_APP_BASE_API;
  static readonly INTERVAL = 500;
  static readonly MAX_STREAM_MESSAGES = 50;
  static readonly DEFAULT_METADATA = { 'Content-Type': 'application/grpc-web' };

  serviceClient!: S;

  // stream?: grpcWeb.ClientReadableStream<ServerStreamingEchoResponse>;

  url: string;

  /**
   * this `metadata` is used for all grpc request
   */
  metadata: Metadata;
  optsDev?: object;

  grpc<Req, Res extends { toObject: (includeInstance?: boolean) => As }, As>(
    executor: (
      req: Req,
      metadata: Metadata,
      callback: GRPCCallback<Res, As>
    ) => grpcWeb.ClientReadableStream<Res>,
    req: Req,
    options: RequestOptions = noobj
  ): Promise<As> {
    const { noAuth = false, metadata = {} } = options;

    return new Promise((resolve, reject) => {
      const callback: GRPCCallback<Res, As> = (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res?.toObject());
      };

      const reqMetadata = { ...this.metadata, ...metadata };
      if (!noAuth) {
        reqMetadata['token'] =
          BaseApi.DEV_TOKEN || useStoreToken?.getState()?.token;
      }

      executor.call(this.serviceClient, req, reqMetadata, callback);
    });
  }

  constructor(options: BaseApiOptions = noobj) {
    const { url = '', token = '', lang = '' } = options;

    this.url = url || BaseApi?.DEFAULT_URL || '';
    this.metadata = { ...BaseApi.DEFAULT_METADATA, token, lang };

    if (process.env['NODE_ENV'] === 'development') {
      const devInterceptors =
        (window as any)['__GRPCWEB_DEVTOOLS__'] || (() => ({}));

      const { devToolsUnaryInterceptor, devToolsStreamInterceptor } =
        devInterceptors();
      if (devToolsUnaryInterceptor && devToolsStreamInterceptor) {
        this.optsDev = {
          unaryInterceptors: [devToolsUnaryInterceptor],
          streamInterceptors: [devToolsStreamInterceptor],
        };
      }
    }
  }
}
