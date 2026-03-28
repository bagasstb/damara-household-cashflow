"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import type { ThrFormData } from "@/types/thr";

export async function addThrSpending(formData: ThrFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("thr_spending").insert({
    description: formData.description,
    amount: formData.amount,
    date: formData.date
      ? new Date(formData.date).toISOString()
      : new Date().toISOString(),
  });

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to add THR spending.");
  }

  revalidatePath("/thr");
}

export async function deleteThrSpending(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("thr_spending").delete().eq("id", id);

  if (error) {
    console.error("Error deleting THR spending:", error);
    throw new Error("Failed to delete THR spending.");
  }

  revalidatePath("/thr");
}
