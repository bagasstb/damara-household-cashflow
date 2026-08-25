"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import type { ReminderFormData } from "@/types/reminder";

export async function addReminder(formData: ReminderFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("reminders").insert({
    name: formData.name,
    amount: formData.amount,
    due_date: new Date(formData.due_date).toISOString(),
    is_paid: formData.is_paid || false,
    category: formData.category,
  });

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to add reminder.");
  }

  revalidatePath("/reminder");
}

export async function deleteReminder(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("reminders").delete().eq("id", id);

  if (error) {
    console.error("Error deleting reminder:", error);
    throw new Error("Failed to delete reminder.");
  }

  revalidatePath("/reminder");
}

export async function toggleReminderPaid(id: string, isPaid: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reminders")
    .update({ is_paid: isPaid })
    .eq("id", id);

  if (error) {
    console.error("Error updating reminder:", error);
    throw new Error("Failed to update reminder.");
  }

  revalidatePath("/reminder");
}
