import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../services/coinGecko';
import type { Period } from '../types';

export const useCoinHistory = (id: string, period: Period) =>
  useQuery({
    queryKey: ['coin-history', id, period],
    queryFn: () => fetchCoinHistory(id, period),
    staleTime: 60_000,
    enabled: !!id,
  });
