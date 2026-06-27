"use client";

import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Plus, X, CalendarRange, Loader2, CheckCircle2, Copy, ChevronRight } from "lucide-react";
import { createCycle } from "@/lib/actions";

const MONTHS_ID = ["JAN","FEB","MAR","APR","MEI","JUN","JUL","AGU","SEP","OKT","NOV","DES"];
const MONTHS_LONG = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

function generateCycleName(start: string, end: string): string {
  if (!start || !end) return "";
  const [, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  return `${sd} ${MONTHS_ID[sm - 1]} – ${ed} ${MONTHS_ID[em - 1]} ${ey}`;
}

/** Returns "YYYY-MM" strings for months that already have a cycle */
function getOccupiedMonths(cycles: { start_date: string; end_date: string }[]): Set<string> {
  const occupied = new Set<string>();
  cycles.forEach((c) => {
    if (!c.start_date) return;
    const [y, m] = c.start_date.split("-");
    occupied.add(`${y}-${m}`);
    // Also mark end_date's month
    if (c.end_date) {
      const [ey, em] = c.end_date.split("-");
      occupied.add(`${ey}-${em}`);
    }
  });
  return occupied;
}

/** Build list of next 12 months from today */
function getNext12Months(): { year: number; month: number; key: string }[] {
  const result = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // 1-indexed
    const key = `${year}-${String(month).padStart(2, "0")}`;
    result.push({ year, month, key });
  }
  return result;
}

interface NewCycleModalProps {
  onClose: () => void;
  cycles: { id: string; name: string; start_date: string; end_date: string }[];
}

function NewCycleModal({ onClose, cycles }: NewCycleModalProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState<{ year: number; month: number } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const occupiedMonths = getOccupiedMonths(cycles);
  const next12 = getNext12Months().filter((m) => !occupiedMonths.has(m.key));

  // Derive start/end dates from selected month + last cycle's end_date
  const lastCycle = cycles.length > 0
    ? cycles.reduce((latest, c) =>
        new Date(c.end_date) > new Date(latest.end_date) ? c : latest
      , cycles[0])
    : null;

  function getDates(year: number, month: number): { start: string; end: string; name: string } {
    let startDate: Date;

    if (lastCycle?.end_date) {
      // start = day after last cycle's end_date
      const lastEnd = new Date(lastCycle.end_date);
      lastEnd.setDate(lastEnd.getDate() + 1);
      startDate = lastEnd;
    } else {
      // Fallback: 1st of the month
      startDate = new Date(year, month - 1, 1);
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 29); // 30 days total

    const fmt = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const start = fmt(startDate);
    const end = fmt(endDate);
    return { start, end, name: generateCycleName(start, end) };
  }

  const preview = selected ? getDates(selected.year, selected.month) : null;

  const handleConfirm = () => {
    if (!preview) return;
    startTransition(async () => {
      try {
        const { cycleId } = await createCycle({
          name: preview.name,
          start_date: preview.start,
          end_date: preview.end,
          savings_target: 0,
        });
        setSuccess(true);
        setTimeout(() => {
          onClose();
          router.push(`/?cycle=${cycleId}`);
          router.refresh();
        }, 1200);
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
      className="flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !isPending && onClose()}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-white/5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
              <CalendarRange className="w-5 h-5 text-primary dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                {confirming ? "Konfirmasi Cycle" : "Pilih Bulan"}
              </h2>
              <p className="text-[10px] text-secondary dark:text-slate-400 font-bold mt-0.5">
                {confirming
                  ? "Cek detail cycle sebelum dibuat"
                  : "Bulan yang sudah ada cycle-nya tidak ditampilkan"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirming) { setConfirming(false); return; }
              if (!isPending) onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-600 dark:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {!confirming ? (
            <>
              {next12.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm font-bold text-slate-400 dark:text-slate-500">
                    Semua bulan 12 bulan ke depan sudah punya cycle.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2.5">
                  {next12.map((m) => {
                    const isSelected = selected?.year === m.year && selected?.month === m.month;
                    return (
                      <button
                        key={m.key}
                        onClick={() => setSelected({ year: m.year, month: m.month })}
                        className={`flex flex-col items-center justify-center gap-0.5 py-3.5 rounded-2xl border-2 font-black transition-all cursor-pointer
                          ${isSelected
                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-[1.04]"
                            : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]"
                          }`}
                      >
                        <span className="text-sm tracking-tight">{MONTHS_ID[m.month - 1]}</span>
                        <span className={`text-[10px] font-bold ${isSelected ? "text-white/70" : "text-slate-400 dark:text-slate-500"}`}>
                          {m.year}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Preview pill */}
              {selected && preview && (
                <div className="mt-4 p-3.5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Preview Cycle Name</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{preview.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                    {preview.start} → {preview.end}
                  </p>
                </div>
              )}

              {/* Budget copy notice */}
              {selected && (
                <div className="mt-3 flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl px-4 py-3">
                  <Copy className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    Budget limits dari cycle sebelumnya akan otomatis disalin ke cycle baru.
                  </p>
                </div>
              )}

              {/* Next button */}
              <button
                onClick={() => setConfirming(true)}
                disabled={!selected}
                className="mt-4 w-full h-12 rounded-2xl text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer bg-primary hover:bg-blue-700 text-white shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            /* ── Confirmation screen ── */
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-2">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Nama Cycle</p>
                    <p className="text-base font-black text-slate-900 dark:text-white">{preview?.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-white/10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Start</p>
                      <p className="text-xs font-black text-slate-700 dark:text-slate-200">{preview?.start}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">End</p>
                      <p className="text-xs font-black text-slate-700 dark:text-slate-200">{preview?.end}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl px-4 py-3">
                  <Copy className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 leading-relaxed">
                    Budget limits dari cycle sebelumnya akan otomatis disalin ke cycle baru.
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={isPending || success}
                className={`w-full h-12 rounded-2xl text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer
                  ${success
                    ? "bg-emerald-500 text-white"
                    : "bg-primary hover:bg-blue-700 text-white shadow-lg shadow-primary/20 disabled:opacity-60"
                  }`}
              >
                {success ? (
                  <><CheckCircle2 className="w-5 h-5" /> Cycle Dibuat!</>
                ) : isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Membuat...</>
                ) : (
                  <><Plus className="w-5 h-5" /> Buat Cycle</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface NewCycleButtonProps {
  cycles?: { id: string; name: string; start_date: string; end_date: string }[];
}

export default function NewCycleButton({ cycles = [] }: NewCycleButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary dark:text-white text-[10px] font-black uppercase tracking-wider transition-all border border-primary/20 dark:border-white/20 hover:border-primary/40 dark:hover:border-white/40 cursor-pointer"
        title="New Cycle"
      >
        <Plus className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">New Cycle</span>
      </button>

      {mounted && open && createPortal(
        <NewCycleModal onClose={() => setOpen(false)} cycles={cycles} />,
        document.body
      )}
    </>
  );
}
