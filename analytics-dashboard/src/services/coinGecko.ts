import type { Coin, GlobalData, MarketChartData, Period } from '../types';

const BASE = 'https://api.coingecko.com/api/v3';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

export const fetchCoins = (page = 1): Promise<Coin[]> =>
  get<Coin[]>(
    `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=24h`
  );

export const fetchGlobal = (): Promise<GlobalData> => get<GlobalData>('/global');

export const fetchCoinHistory = (id: string, days: Period): Promise<MarketChartData> =>
  get<MarketChartData>(`/coins/${id}/market_chart?vs_currency=usd&days=${days}`);
