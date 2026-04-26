"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import type { SavingEntryFormData } from "@/types/saving";

/**
 * Upsert a saving entry (insert or update on conflict).
 */
export async function upsertSavingEntry(formData: SavingEntryFormData) {
  const supabase = await createClient();

  // Check if entry exists
  const { data: existing } = await supabase
    .from("saving_entries")
    .select("id")
    .eq("goal_id", formData.goal_id)
    .eq("year", formData.year)
    .eq("month", formData.month)
    .maybeSingle();

  if (existing) {
    // Update
    const { error } = await supabase
      .from("saving_entries")
      .update({
        amount: formData.amount,
        note: formData.note || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Error updating saving entry:", error);
      throw new Error("Failed to update saving entry.");
    }
  } else {
    // Insert
    const { error } = await supabase.from("saving_entries").insert({
      goal_id: formData.goal_id,
      year: formData.year,
      month: formData.month,
      amount: formData.amount,
      note: formData.note || null,
    });

    if (error) {
      console.error("Error inserting saving entry:", error);
      throw new Error("Failed to add saving entry.");
    }
  }

  revalidatePath("/saving");
  revalidatePath(`/saving/${formData.year}`);
  revalidatePath("/");
}
