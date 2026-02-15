export const formatPercent = (value, decimals = 2) =>
  `${(value * 100).toFixed(decimals)}%`;

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatNumber = (value) =>
  new Intl.NumberFormat('en-US').format(value);
