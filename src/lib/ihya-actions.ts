"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import type { IhyaFormData } from "@/types/ihya";

export async function addIhyaAssistance(formData: IhyaFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("ihya_assistances").insert({
    description: formData.description,
    amount: formData.amount,
    date: formData.date
      ? new Date(formData.date).toISOString()
      : new Date().toISOString(),
  });

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to add Ihya assistance.");
  }

  revalidatePath("/ihya");
}

export async function deleteIhyaAssistance(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("ihya_assistances").delete().eq("id", id);

  if (error) {
    console.error("Error deleting Ihya assistance:", error);
    throw new Error("Failed to delete Ihya assistance.");
  }

  revalidatePath("/ihya");
}
