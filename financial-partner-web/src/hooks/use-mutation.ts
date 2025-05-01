import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { ApiError, handleApiError } from '../lib/api-client';

export function useApiMutation<TData = unknown, TVariables = void, TError = ApiError>(
  options: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> & {
    mutationFn: (variables: TVariables) => Promise<TData>;
  }
) {
  return useMutation<TData, TError, TVariables>({
    ...options,
    onError: (error) => {
      const apiError = handleApiError(error);
      options.onError?.(apiError as TError);
    },
  });
} 