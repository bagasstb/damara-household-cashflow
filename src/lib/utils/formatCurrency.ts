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
  if (!dateStr) return "";
  const cleanStr = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const parts = cleanStr.split("-");
  if (parts.length === 3) {
    const [y, m, d] = parts.map(Number);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      const date = new Date(y, m - 1, d);
      const month = date.toLocaleString("en-US", { month: "long" });
      return `${d} ${month}`;
    }
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  return `${day} ${month}`;
}

/**
 * Format a date string to full display format.
 * @example formatDateFull("2026-06-20") => "20 June 2026"
 */
export function formatDateFull(dateStr: string): string {
  if (!dateStr) return "";
  const cleanStr = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const parts = cleanStr.split("-");
  if (parts.length === 3) {
    const [y, m, d] = parts.map(Number);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      const date = new Date(y, m - 1, d);
      const month = date.toLocaleString("en-US", { month: "long" });
      return `${d} ${month} ${y}`;
    }
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a duration in days into a human-readable string.
 * - <= 30 days: "X hari" (or "Hari ini" if 0)
 * - > 30 days: "X bulan Y hari"
 * - >= 365 days: "X tahun Y bulan Z hari"
 * @example formatDuration(5) => "5 hari"
 * @example formatDuration(33) => "1 bulan 3 hari"
 * @example formatDuration(400) => "1 tahun 1 bulan 5 hari"
 */
export function formatDuration(totalDays: number): string {
  const days = Math.abs(totalDays);
  if (days === 0) return "Hari ini";
  if (days <= 30) return `${days} hari`;

  const years = Math.floor(days / 365);
  const remainingAfterYears = days % 365;
  const months = Math.floor(remainingAfterYears / 30);
  const remainingDays = remainingAfterYears % 30;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} tahun`);
  if (months > 0) parts.push(`${months} bulan`);
  if (remainingDays > 0) parts.push(`${remainingDays} hari`);

  return parts.join(" ") || `${days} hari`;
}


