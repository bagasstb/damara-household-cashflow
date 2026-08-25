export type ReminderCategory = "pajak" | "service" | "asuransi" | "lainnya";

export interface Reminder {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  is_paid: boolean;
  category: ReminderCategory;
  created_at: string;
}

export interface ReminderFormData {
  name: string;
  amount: number;
  due_date: string;
  is_paid?: boolean;
  category: ReminderCategory;
}

export const CATEGORY_LABELS: Record<ReminderCategory, string> = {
  pajak: "Pajak",
  service: "Service",
  asuransi: "Asuransi",
  lainnya: "Lainnya",
};

export const CATEGORY_COLORS: Record<ReminderCategory, { bg: string; text: string; border: string }> = {
  pajak: { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-200 dark:border-red-500/20" },
  service: { bg: "bg-blue-100 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-500/20" },
  asuransi: { bg: "bg-purple-100 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-500/20" },
  lainnya: { bg: "bg-slate-100 dark:bg-slate-500/10", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-500/20" },
};

export function getDaysRemaining(dueDate: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getUrgencyColor(daysRemaining: number): { bg: string; text: string; label: string } {
  if (daysRemaining < 0) return { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", label: "Terlambat" };
  if (daysRemaining <= 7) return { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", label: `${daysRemaining} hari` };
  if (daysRemaining <= 30) return { bg: "bg-amber-100 dark:bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", label: `${daysRemaining} hari` };
  if (daysRemaining <= 90) return { bg: "bg-blue-100 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", label: `${daysRemaining} hari` };
  return { bg: "bg-green-100 dark:bg-green-500/10", text: "text-green-600 dark:text-green-400", label: `${daysRemaining} hari` };
}
