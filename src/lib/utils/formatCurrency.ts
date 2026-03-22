/**
 * Format a number as Indonesian Rupiah.
 * @example formatCurrency(59000) => "59,000"
 * @example formatCurrency(6548000) => "6,548,000"
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format amount in compact form.
 * @example formatCompact(2946600) => "2.9M"
 * @example formatCompact(650000) => "650k"
 */
export function formatCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}k`;
  }
  return amount.toString();
}

/**
 * Format a date string to display format.
 * @example formatDate("2026-06-20") => "20 June"
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  return `${day} ${month}`;
}

/**
 * Format a date string to full display format.
 * @example formatDateFull("2026-06-20") => "20 June 2026"
 */
export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}
