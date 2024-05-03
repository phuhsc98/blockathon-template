import {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useStoreToken } from '@front-end/core';
import { Centrifuge } from 'centrifuge';

type TWebSocketContext = {
  isLoadingInit: boolean;
  centrifuge?: Centrifuge;
};

interface Props {
  children?: ReactNode;
  url: string;
}

export const WebSocketContext = createContext<TWebSocketContext | null>(null);

export const WebSocketContextProvider = ({ children, url }: Props) => {
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const partnerToken = useStoreToken((state: any) => state.token);

  const centrifugeRef = useRef<Centrifuge>();

  function initWebSocket(token: string) {
    try {
      // const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket', {
      //   token:
      //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE2ODI5MjUzNzcsImlhdCI6MTY4MjMyMDU3N30.1YxGImOghprxbMK5mfcYaavb6sFNZnZzJPFAD9hBpvQ',
      //   debug: true,
      // });

      if (!url) {
        return;
      }

      const centrifuge = new Centrifuge(`${url}/connection/websocket`, {
        token,
      });

      centrifuge
        .on('connecting', function (ctx) {
          console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
        })
        .on('connected', function (ctx) {
          console.log(`connected over ${ctx.transport}`);
          setIsLoadingInit(false);
        })
        .on('disconnected', function (ctx) {
          console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
        })
        .connect();

      centrifugeRef.current = centrifuge;
    } catch (error) {
      console.log('error', error);
    }
  }

  const valueMemo = useMemo<TWebSocketContext>(
    () => ({
      isLoadingInit,
      centrifuge: centrifugeRef.current,
      //
    }),
    [isLoadingInit]
  );

  useEffect(() => {
    if (partnerToken) {
      initWebSocket(partnerToken);
    }
  }, [partnerToken]);

  return (
    <WebSocketContext.Provider value={valueMemo}>
      {children}
    </WebSocketContext.Provider>
  );
};
