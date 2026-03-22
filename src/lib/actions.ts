"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import type { TransactionFormData } from "@/types";

export async function addTransaction(
  cycleId: string,
  formData: TransactionFormData
) {
  const supabase = await createClient();

  const { error } = await supabase.from("transactions").insert({
    cycle_id: cycleId,
    category_id: formData.category.toLowerCase(),
    description: formData.description,
    amount: formData.amount,
    channel: formData.channel,
    cost_type: formData.cost_type,
    is_reimbursable: formData.is_reimbursable,
    date: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
  });

  if (error) {
    console.error("Database Error:", error.message);
    throw new Error("Failed to add transaction.");
  }

  // Clear cache for the home page so data is refreshed
  revalidatePath("/");
}

export async function markAsTransferred(transactionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("transactions")
    .update({ is_transferred: true })
    .eq("id", transactionId);

  if (error) {
    console.error("Error marking as transferred:", error);
    throw new Error("Failed to mark transaction as transferred.");
  }

  revalidatePath("/");
}

export async function deleteTransaction(transactionId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Failed to delete transaction.");
  }

  revalidatePath("/");
}

export async function updateTransaction(
  transactionId: string,
  data: Partial<TransactionFormData>
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("transactions")
    .update({
      description: data.description,
      amount: data.amount,
      channel: data.channel,
      category_id: data.category?.toLowerCase(),
      cost_type: data.cost_type,
      date: data.date ? new Date(data.date).toISOString() : undefined,
    })
    .eq("id", transactionId);

  if (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction.");
  }

  revalidatePath("/");
}
