import {
  ENotificationType,
  IResponseError,
  message,
  noarr,
  noobj,
  noop,
} from '@front-end/core';
import {
  MutationFunction,
  UseMutateFunction,
  useMutation as useCustomMutation,
  UseMutateAsyncFunction,
  MutationKey,
} from '@tanstack/react-query';

interface UseMutation<TData, TVariables, TContext> {
  data?: TData;
  error: IResponseError | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  mutate: UseMutateFunction<TData, IResponseError, TVariables, TContext>;
  mutateAsync: UseMutateAsyncFunction<
    TData,
    IResponseError,
    TVariables,
    TContext
  >;
}

interface MutationProps<TData, TVariables, TContext> {
  onSuccess?(data: TData): void;
  onError?(
    error?: IResponseError | null,
    vars?: TVariables,
    ctx?: TContext
  ): void;
  mutationKey?: MutationKey;
  mutationFn: MutationFunction<TData, TVariables>;
}

export function useAppMutation<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  {
    mutationFn,
    onSuccess,
    mutationKey = noarr,
    onError = noop,
  }: MutationProps<TData, TVariables, TContext>,
  options: any = noobj
): UseMutation<TData, TVariables, TContext> {
  const { notificationType = ENotificationType.Message } = {
    ...(options || noobj),
  };
  const { isLoading, isError, isSuccess, data, error, mutate, mutateAsync } =
    useCustomMutation<TData, IResponseError, TVariables, TContext>({
      cacheTime: 0,
      mutationFn,
      mutationKey,
      onSuccess,
      onError: (error, vars, ctx) => {
        switch (notificationType) {
          case ENotificationType.Message:
            // TODO add data-testid for antd message

            message().open({
              type: 'error',
              content: error?.message,
            });

            break;
          default:
            break;
        }

        //!Hotfix expired token.
        // TODO: HANDLE Expired token later
        if (error?.message === 'Token is expired') {
          localStorage.clear();
          window.document.location.href = '/';
        }

        onError(error, vars, ctx);
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    data: data,
    error,
    mutate,
    mutateAsync,
  };
}

export default useAppMutation;
