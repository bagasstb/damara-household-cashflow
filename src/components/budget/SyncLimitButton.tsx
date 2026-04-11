"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { syncBudgetLimitsFromSheet } from "@/lib/sheet-import";

export default function SyncLimitButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSync = () => {
    startTransition(async () => {
      try {
        await syncBudgetLimitsFromSheet();
        router.refresh();
      } catch (e) {
        console.error("Failed to sync limits:", e);
      }
    });
  };

  return (
    <button
      onClick={handleSync}
      disabled={isPending}
      className={`text-[10px] font-black uppercase text-primary dark:text-blue-400 hover:underline ${
        isPending ? "opacity-50 cursor-not-allowed animate-pulse" : ""
      }`}
    >
      {isPending ? "Syncing..." : "Sync Limit"}
    </button>
  );
}
