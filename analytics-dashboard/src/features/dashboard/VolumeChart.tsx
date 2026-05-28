import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card } from '../../components/Card';
import { Skeleton } from '../../components/Skeleton';
import { formatCurrency } from '../../utils/formatters';
import type { Coin } from '../../types';

interface Props {
  coins: Coin[] | undefined;
  isLoading: boolean;
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#4f46e5', '#7c3aed', '#9333ea', '#a855f7', '#c026d3'];

export const VolumeChart = ({ coins, isLoading }: Props) => {
  const data = coins
    ?.slice(0, 10)
    .map((c) => ({ name: c.symbol.toUpperCase(), volume: c.total_volume })) ?? [];

  return (
    <Card>
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
        Top 10 by 24h Volume
      </h2>
      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={256}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'currentColor' }} className="text-zinc-400" tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: 'currentColor' }}
              className="text-zinc-400"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => formatCurrency(v, true)}
              width={70}
            />
            <Tooltip
              formatter={(v) => [formatCurrency(typeof v === 'number' ? v : 0, true), 'Volume']}
              contentStyle={{ background: 'var(--tooltip-bg)', border: 'none', borderRadius: '8px', fontSize: '12px' }}
            />
            <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
