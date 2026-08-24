"use client";

import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  CloudDownload,
  RefreshCw,
  Loader2,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import { importFromGoogleSheet, syncBudgetLimitsFromSheet } from "@/lib/sheet-import";

type ActionStatus = "idle" | "loading" | "success" | "error";

export default function ImportMenuCard() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [importStatus, setImportStatus] = useState<ActionStatus>("idle");
  const [syncStatus, setSyncStatus] = useState<ActionStatus>("idle");
  const [importMsg, setImportMsg] = useState("");
  const [syncMsg, setSyncMsg] = useState("");
  const [isPendingImport, startImport] = useTransition();
  const [isPendingSync, startSync] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImport = () => {
    setImportStatus("loading");
    setImportMsg("");
    startImport(async () => {
      try {
        const res = await importFromGoogleSheet();
        const hasError = res.errors.length > 0 && res.imported === 0;
        setImportStatus(hasError ? "error" : "success");
        setImportMsg(
          hasError
            ? "Import gagal"
            : `+${res.imported} baru, ↻${res.updated} updated`
        );
        if (!hasError) router.refresh();
      } catch {
        setImportStatus("error");
        setImportMsg("Import gagal");
      }
    });
  };

  const handleSync = () => {
    setSyncStatus("loading");
    setSyncMsg("");
    startSync(async () => {
      try {
        const res = await syncBudgetLimitsFromSheet();
        setSyncStatus(res.errors.length > 0 && res.updated === 0 ? "error" : "success");
        setSyncMsg(
          res.errors.length > 0 && res.updated === 0
            ? "Sync gagal"
            : `${res.updated} limit diupdate`
        );
        router.refresh();
      } catch {
        setSyncStatus("error");
        setSyncMsg("Sync gagal");
      }
    });
  };

  const isAnyLoading = isPendingImport || isPendingSync;

  return (
    <>
      {/* Import Card Button */}
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="block group w-full text-left cursor-pointer"
      >
        <div className="bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-white/10 rounded-2xl md:rounded-[1.75rem] p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
            <CloudDownload className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-800 dark:text-white tracking-tight">
            Import
          </h3>
        </div>
      </button>

      {/* Modal Portal */}
      {mounted &&
        open &&
        createPortal(
          <div
            style={{ position: "fixed", inset: 0, zIndex: 9999 }}
            className="flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => !isAnyLoading && setOpen(false)}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-sm bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-500/10 dark:bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <CloudDownload className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                      Google Sheet Sync
                    </h2>
                    <p className="text-[10px] text-secondary dark:text-slate-400 font-bold mt-0.5">
                      Sinkronisasi data dengan Google Sheet
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !isAnyLoading && setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-600 dark:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Actions List */}
              <div className="p-5 space-y-3">
                {/* 1. Import Transaksi */}
                <button
                  onClick={handleImport}
                  disabled={isPendingImport}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 flex items-start gap-3.5 transition-all text-left disabled:opacity-60 cursor-pointer"
                >
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 flex items-center justify-center shrink-0">
                    {importStatus === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : importStatus === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : importStatus === "error" ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CloudDownload className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-slate-800 dark:text-white">
                        Import Transaksi
                      </p>
                      {importStatus === "loading" && (
                        <span className="text-[10px] font-bold text-primary animate-pulse">
                          Proses...
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5 leading-snug">
                      {importMsg || "Tarik data transaksi terbaru dari Google Sheet"}
                    </p>
                  </div>
                </button>

                {/* 2. Sync Budget Limit */}
                <button
                  onClick={handleSync}
                  disabled={isPendingSync}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:border-violet-500/50 dark:hover:border-violet-500/50 flex items-start gap-3.5 transition-all text-left disabled:opacity-60 cursor-pointer"
                >
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    {syncStatus === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : syncStatus === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : syncStatus === "error" ? (
                      <XCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-slate-800 dark:text-white">
                        Sync Budget Limit
                      </p>
                      {syncStatus === "loading" && (
                        <span className="text-[10px] font-bold text-violet-600 animate-pulse">
                          Proses...
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold mt-0.5 leading-snug">
                      {syncMsg || "Perbarui limit anggaran dari Google Sheet"}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
