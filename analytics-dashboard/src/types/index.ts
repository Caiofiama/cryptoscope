export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
}

export interface GlobalData {
  data: {
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
  };
}

export interface MarketChartData {
  prices: [number, number][];
}

export type Period = '7' | '30' | '90';
export type SortKey = 'market_cap' | 'current_price' | 'price_change_percentage_24h' | 'total_volume';
export type SortDir = 'asc' | 'desc';
