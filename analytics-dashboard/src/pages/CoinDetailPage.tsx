import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUIStore } from '../stores/uiStore';
import { useCoinHistory } from '../hooks/useCoinHistory';
import { useCoinList } from '../hooks/useCoinList';
import { PriceChart } from '../features/dashboard/PriceChart';
import { ChangeBadge } from '../components/ChangeBadge';
import { Card } from '../components/Card';
import { Skeleton } from '../components/Skeleton';
import { formatCurrency, formatLargeNumber } from '../utils/formatters';

export const CoinDetailPage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { period, setPeriod } = useUIStore();
  const { data: history, isLoading: historyLoading } = useCoinHistory(id, period);
  const { data: coins, isLoading: coinsLoading } = useCoinList();
  const coin = coins?.find((c) => c.id === id);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {coinsLoading ? (
        <Skeleton className="h-16 w-64" />
      ) : coin ? (
        <div className="flex items-center gap-4">
          <img src={coin.image} alt={coin.name} className="h-12 w-12 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{coin.name}</h1>
            <span className="text-zinc-400 uppercase text-sm">{coin.symbol}</span>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              {formatCurrency(coin.current_price)}
            </p>
            <ChangeBadge value={coin.price_change_percentage_24h} />
          </div>
        </div>
      ) : null}

      <PriceChart
        data={history}
        isLoading={historyLoading}
        period={period}
        onPeriodChange={setPeriod}
        coinName={coin?.name}
      />

      {coin && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { label: 'Market Cap', value: `$${formatLargeNumber(coin.market_cap)}` },
            { label: '24h Volume', value: `$${formatLargeNumber(coin.total_volume)}` },
            { label: 'Rank', value: `#${coin.market_cap_rank}` },
          ].map(({ label, value }) => (
            <Card key={label}>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">{label}</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{value}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
