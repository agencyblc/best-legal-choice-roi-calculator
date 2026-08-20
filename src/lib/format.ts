export function formatCurrency(value: number): string {
  const safe = Number.isFinite(value) ? value : 0
  return safe.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export function formatCurrencySigned(value: number): string {
  const safe = Number.isFinite(value) ? value : 0
  const sign = safe < 0 ? '-' : safe > 0 ? '+' : ''
  return `${sign}${formatCurrency(Math.abs(safe))}`
}

export function formatNumber(value: number): string {
  const safe = Number.isFinite(value) ? value : 0
  return safe.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

export function formatMultiple(value: number): string {
  const safe = Number.isFinite(value) ? value : 0
  return `${safe.toFixed(1)}x`
}
