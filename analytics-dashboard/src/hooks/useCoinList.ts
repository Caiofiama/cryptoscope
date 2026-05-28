import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '../services/coinGecko';

export const useCoinList = () =>
  useQuery({
    queryKey: ['coins'],
    queryFn: () => fetchCoins(),
    staleTime: 60_000,
  });
