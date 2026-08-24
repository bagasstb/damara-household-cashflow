import { createClient } from "./supabase/server";
import type { IhyaAssistance } from "@/types/ihya";

export async function getIhyaAssistances(): Promise<IhyaAssistance[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ihya_assistances")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching Ihya assistances:", error);
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
