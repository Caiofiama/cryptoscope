export const formatCurrency = (n: number, compact = false): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 2 : n < 1 ? 6 : 2,
  }).format(n);

export const formatPercent = (n: number): string =>
  `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

export const formatLargeNumber = (n: number): string =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(n);
