import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
  prices: number[];
  positive: boolean;
}

export const Sparkline = ({ prices, positive }: Props) => {
  const data = prices.map((p) => ({ p }));
  return (
    <ResponsiveContainer width={80} height={32}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="p"
          stroke={positive ? '#10b981' : '#ef4444'}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
