import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError, handleApiError } from '../lib/api-client';

export function useApiQuery<TData = unknown, TError = ApiError>(
  options: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> & {
    queryKey: unknown[];
    queryFn: () => Promise<TData>;
  }
) {
  return useQuery<TData, TError>({
    ...options,
    onError: (error) => {
      const apiError = handleApiError(error);
      options.onError?.(apiError as TError);
    },
  });
} 