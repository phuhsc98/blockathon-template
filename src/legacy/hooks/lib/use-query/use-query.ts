import {
  QueryFunction,
  QueryKey,
  useQuery as useCustomQuery,
} from '@tanstack/react-query';

import {
  ENotificationType,
  IResponseError,
  message,
  noop,
} from '@front-end/core';

export interface IUseQueryConfig<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> {
  enabled?: boolean;
  queryKey: TQueryKey;
  suspense?: boolean;
  queryFn?: QueryFunction<TQueryFnData, TQueryKey>;
  select?(data: TQueryFnData): TData;
  onError?(error: IResponseError): void;
  onSuccess?(data: TData): void;
}

export interface IUseQueryOptions {
  notificationType?: ENotificationType;
}

export function useQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  {
    enabled,
    queryKey,
    queryFn,
    select,
    onSuccess = noop,
    onError = noop,
  }: IUseQueryConfig<TQueryFnData, TData, TQueryKey>,
  options?: IUseQueryOptions
) {
  const { notificationType } = options || { notificationType: undefined };

  const { data, error, isLoading, refetch, isError, isSuccess } =
    useCustomQuery<TQueryFnData, IResponseError, TData, TQueryKey>({
      enabled,
      queryKey,
      queryFn,
      select,
      onSuccess,
      onError(error) {
        switch (notificationType) {
          case ENotificationType.Message:
            message().open({ type: 'error', content: error?.message });
            break;

          default:
            break;
        }
        onError(error);
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    });

  return { data, error, isLoading, refetch, isError, isSuccess };
}

export default useQuery;
