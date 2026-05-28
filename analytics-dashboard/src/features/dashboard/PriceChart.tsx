import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Card } from '../../components/Card';
import { Skeleton } from '../../components/Skeleton';
import { formatCurrency } from '../../utils/formatters';
import type { MarketChartData, Period } from '../../types';

interface Props {
  data: MarketChartData | undefined;
  isLoading: boolean;
  period: Period;
  onPeriodChange: (p: Period) => void;
  coinName?: string;
}

const PERIODS: Period[] = ['7', '30', '90'];
const PERIOD_LABELS: Record<Period, string> = { '7': '7D', '30': '30D', '90': '90D' };

export const PriceChart = ({ data, isLoading, period, onPeriodChange, coinName = 'Bitcoin' }: Props) => {
  const chartData = data?.prices.map(([ts, price]) => ({
    date: new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price,
  })) ?? [];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
          {coinName} Price History
        </h2>
        <div className="flex gap-1" role="group" aria-label="Period selector">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              aria-pressed={period === p}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                period === p
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-zinc-400"
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-zinc-400"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => formatCurrency(v, true)}
              width={70}
            />
            <Tooltip
              formatter={(v) => [formatCurrency(typeof v === 'number' ? v : 0), 'Price']}
              contentStyle={{
                background: 'var(--tooltip-bg)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
