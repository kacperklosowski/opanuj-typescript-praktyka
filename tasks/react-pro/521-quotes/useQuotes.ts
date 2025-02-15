import { useQuery } from '@tanstack/react-query'
import { getQuotes } from './api/quotes-api';

export function useQuotes(page: number, limit: number) {
  const { data, isLoading } = useQuery({
    queryKey: ['quotes', page],
    queryFn: async () => {
      const response = await getQuotes(page, limit);
      return response;
    }
  });

  return [data, isLoading] as const;
}