import { createClient } from "./supabase/server";
import type { ThrSpending } from "@/types/thr";

export async function getThrSpending(): Promise<ThrSpending[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("thr_spending")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching THR spending:", error);
    return [];
  }

  return (data || []).map((item) => ({
    id: item.id,
    description: item.description,
    amount: item.amount,
    date: new Date(item.date).toISOString().split("T")[0],
    created_at: item.created_at,
  }));
}
