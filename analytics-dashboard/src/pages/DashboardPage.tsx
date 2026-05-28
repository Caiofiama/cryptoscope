import { useUIStore } from '../stores/uiStore';
import { useCoinList } from '../hooks/useCoinList';
import { useGlobal } from '../hooks/useGlobal';
import { useCoinHistory } from '../hooks/useCoinHistory';
import { KpiCards } from '../features/dashboard/KpiCards';
import { PriceChart } from '../features/dashboard/PriceChart';
import { VolumeChart } from '../features/dashboard/VolumeChart';
import { CoinTable } from '../features/coins/CoinTable';
import { SearchInput } from '../features/coins/SearchInput';

export const DashboardPage = () => {
  const { period, setPeriod, sortKey, sortDir, setSort, search, setSearch } = useUIStore();
  const { data: coins, isLoading: coinsLoading } = useCoinList();
  const { data: global, isLoading: globalLoading } = useGlobal();
  const { data: history, isLoading: historyLoading } = useCoinHistory('bitcoin', period);

  return (
    <div className="space-y-6">
      <KpiCards global={global} coins={coins} isLoading={globalLoading || coinsLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PriceChart
          data={history}
          isLoading={historyLoading}
          period={period}
          onPeriodChange={setPeriod}
        />
        <VolumeChart coins={coins} isLoading={coinsLoading} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">All Coins</h2>
          <div className="w-64">
            <SearchInput value={search} onChange={setSearch} />
          </div>
        </div>
        <CoinTable
          coins={coins}
          isLoading={coinsLoading}
          search={search}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={setSort}
        />
      </div>
    </div>
  );
};
