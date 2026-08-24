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
      is_reimbursable: data.is_reimbursable,
      date: data.date ? new Date(data.date).toISOString() : undefined,
    })
    .eq("id", transactionId);

  if (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction.");
  }

  revalidatePath("/");
}

export interface CreateCycleInput {
  name: string;
  start_date: string;
  end_date: string;
  savings_target: number;
  gid?: string;
}

export async function createCycle(input: CreateCycleInput): Promise<{ cycleId: string }> {
  const supabase = await createClient();

  const cyclePayload: Record<string, any> = {
    name: input.name,
    start_date: input.start_date,
    end_date: input.end_date,
    savings_target: input.savings_target,
  };

  if (input.gid) {
    cyclePayload.gid = input.gid.trim();
  }

  // 1. Create the new cycle
  const { data: newCycle, error: cycleError } = await supabase
    .from("cycles")
    .insert(cyclePayload)
    .select("id")
    .single();

  if (cycleError || !newCycle) {
    throw new Error(cycleError?.message ?? "Failed to create cycle.");
  }

  // 2. Find the most recent previous cycle (by start_date, excluding new one)
  const { data: prevCycles } = await supabase
    .from("cycles")
    .select("id")
    .neq("id", newCycle.id)
    .order("start_date", { ascending: false })
    .limit(1);

  const prevCycleId = prevCycles?.[0]?.id;

  // 3. Auto-copy budget limits from previous cycle
  if (prevCycleId) {
    const { data: prevBudgets } = await supabase
      .from("budget_limits")
      .select("category_id, label, limit_amount")
      .eq("cycle_id", prevCycleId);

    if (prevBudgets && prevBudgets.length > 0) {
      const newBudgets = prevBudgets.map((b) => ({
        cycle_id: newCycle.id,
        category_id: b.category_id,
        label: b.label,
        limit_amount: b.limit_amount,
      }));

      await supabase.from("budget_limits").insert(newBudgets);
    }
  }

  revalidatePath("/");
  return { cycleId: newCycle.id };
}

