import { TrendingUp, DollarSign, BarChart2, PieChart } from 'lucide-react';
import { Card } from '../../components/Card';
import { Skeleton } from '../../components/Skeleton';
import { formatCurrency, formatPercent, formatLargeNumber } from '../../utils/formatters';
import type { GlobalData, Coin } from '../../types';

interface Props {
  global: GlobalData | undefined;
  coins: Coin[] | undefined;
  isLoading: boolean;
}

export const KpiCards = ({ global, coins, isLoading }: Props) => {
  const totalMarketCap = global?.data.total_market_cap.usd ?? 0;
  const totalVolume = global?.data.total_volume.usd ?? 0;
  const marketCapChange = global?.data.market_cap_change_percentage_24h_usd ?? 0;
  const btcDominance = global?.data.market_cap_percentage.btc ?? 0;

  const avgPriceChange =
    coins && coins.length > 0
      ? coins.reduce((acc, c) => acc + c.price_change_percentage_24h, 0) / coins.length
      : 0;

  const kpis = [
    {
      label: 'Total Market Cap',
      value: formatCurrency(totalMarketCap, true),
      sub: formatPercent(marketCapChange) + ' 24h',
      icon: DollarSign,
      positive: marketCapChange >= 0,
    },
    {
      label: '24h Volume',
      value: formatCurrency(totalVolume, true),
      sub: 'Global trading volume',
      icon: BarChart2,
      positive: true,
    },
    {
      label: 'Avg Price Change',
      value: formatPercent(avgPriceChange),
      sub: 'Top 50 coins · 24h',
      icon: TrendingUp,
      positive: avgPriceChange >= 0,
    },
    {
      label: 'BTC Dominance',
      value: `${formatLargeNumber(btcDominance)}%`,
      sub: 'Market cap share',
      icon: PieChart,
      positive: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {kpis.map(({ label, value, sub, icon: Icon, positive }) => (
        <Card key={label}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {label}
            </span>
            <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          </div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p>
          <p className={`mt-1 text-xs ${positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
            {sub}
          </p>
        </Card>
      ))}
    </div>
  );
};
