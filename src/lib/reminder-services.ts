import { createClient } from "./supabase/server";
import type { Reminder } from "@/types/reminder";

export async function getReminders(): Promise<Reminder[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }

  return (data || []).map((item) => ({
    id: item.id,
    name: item.name,
    amount: item.amount,
    due_date: new Date(item.due_date).toISOString().split("T")[0],
    is_paid: item.is_paid,
    category: item.category,
    created_at: item.created_at,
  }));
}

export async function getReminderStats() {
  const reminders = await getReminders();

  const unpaid = reminders.filter((r) => !r.is_paid);
  const paid = reminders.filter((r) => r.is_paid);

  const totalUnpaid = unpaid.reduce((sum, r) => sum + r.amount, 0);
  const totalPaid = paid.reduce((sum, r) => sum + r.amount, 0);

  return {
    total: reminders.length,
    unpaidCount: unpaid.length,
    paidCount: paid.length,
    totalUnpaid,
    totalPaid,
  };
}
