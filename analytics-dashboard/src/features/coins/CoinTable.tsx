import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Skeleton } from '../../components/Skeleton';
import { ChangeBadge } from '../../components/ChangeBadge';
import { Sparkline } from './Sparkline';
import { formatCurrency, formatLargeNumber } from '../../utils/formatters';
import { useDebounce } from '../../hooks/useDebounce';
import type { Coin, SortKey, SortDir } from '../../types';

interface Props {
  coins: Coin[] | undefined;
  isLoading: boolean;
  search: string;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const COLUMNS: { label: string; key: SortKey; align: string }[] = [
  { label: 'Price', key: 'current_price', align: 'text-right' },
  { label: '24h %', key: 'price_change_percentage_24h', align: 'text-right' },
  { label: 'Market Cap', key: 'market_cap', align: 'text-right' },
  { label: 'Volume', key: 'total_volume', align: 'text-right' },
];

export const CoinTable = ({ coins, isLoading, search, sortKey, sortDir, onSort }: Props) => {
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!coins) return [];
    const q = debouncedSearch.toLowerCase();
    const list = q
      ? coins.filter((c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q))
      : coins;

    return [...list].sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortDir === 'asc' ? diff : -diff;
    });
  }, [coins, debouncedSearch, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (
      sortDir === 'asc' ? <ChevronUp className="inline h-3 w-3" /> : <ChevronDown className="inline h-3 w-3" />
    ) : null;

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide w-8">#</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Coin</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide hidden sm:table-cell">7d</th>
            {COLUMNS.map(({ label, key, align }) => (
              <th
                key={key}
                onClick={() => onSort(key)}
                className={`px-4 py-3 ${align} text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide cursor-pointer hover:text-zinc-900 dark:hover:text-white select-none`}
                aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                {label} <SortIcon col={key} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin, i) => (
            <tr
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 text-zinc-400 text-xs">{i + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="h-6 w-6 rounded-full" loading="lazy" />
                  <span className="font-medium text-zinc-900 dark:text-white">{coin.name}</span>
                  <span className="text-zinc-400 uppercase text-xs hidden sm:inline">{coin.symbol}</span>
                </div>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                {coin.sparkline_in_7d && (
                  <Sparkline
                    prices={coin.sparkline_in_7d.price}
                    positive={coin.price_change_percentage_24h >= 0}
                  />
                )}
              </td>
              <td className="px-4 py-3 text-right font-medium text-zinc-900 dark:text-white">
                {formatCurrency(coin.current_price)}
              </td>
              <td className="px-4 py-3 text-right">
                <ChangeBadge value={coin.price_change_percentage_24h} />
              </td>
              <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-300">
                ${formatLargeNumber(coin.market_cap)}
              </td>
              <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-300">
                ${formatLargeNumber(coin.total_volume)}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-zinc-400">
                No coins match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
