import { useQuery } from '@tanstack/react-query';
import { fetchGlobal } from '../services/coinGecko';

export const useGlobal = () =>
  useQuery({
    queryKey: ['global'],
    queryFn: fetchGlobal,
    staleTime: 60_000,
  });
