"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Plus, X, CalendarRange, Loader2, CheckCircle2, Copy } from "lucide-react";
import { createCycle } from "@/lib/actions";

const MONTHS = ["JAN","FEB","MAR","APR","MEI","JUN","JUL","AGU","SEP","OKT","NOV","DES"];

function formatDisplayDate(iso: string): string {
  if (!iso) return "Pilih tanggal";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function generateCycleName(start: string, end: string): string {
  if (!start || !end) return "";
  const [, sm, sd] = start.split("-").map(Number);
  const [ey, em, ed] = end.split("-").map(Number);
  return `${sd} ${MONTHS[sm - 1]} – ${ed} ${MONTHS[em - 1]} ${ey}`;
}

const labelClass = "block text-[10px] font-black uppercase text-secondary/60 dark:text-slate-500 tracking-wider mb-1.5";
const inputClass = "w-full h-11 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-4 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-0">
      <label className={labelClass}>{label}</label>
      {/* Clickable styled display */}
      <div
        className={`${inputClass} flex items-center cursor-pointer`}
        onClick={() => {
          ref.current?.focus();
          ref.current?.showPicker?.();
        }}
      >
        <span>{formatDisplayDate(value)}</span>
      </div>
      {/* Native date input — NOT hidden, but visually collapsed to 0 height so it doesn't take layout space. Must NOT be inside overflow:hidden. */}
      <div className="relative" style={{ height: 0, overflow: "visible" }}>
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 0,
            opacity: 0,
            pointerEvents: "none",
            border: "none",
            padding: 0,
          }}
        />
      </div>
    </div>
  );
}

function NewCycleModal({ onClose }: { onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const defaultEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  const [form, setForm] = useState({
    name: generateCycleName(today, defaultEnd),
    start_date: today,
    end_date: defaultEnd,
  });

  useEffect(() => {
    if (!nameManuallyEdited) {
      setForm((f) => ({ ...f, name: generateCycleName(f.start_date, f.end_date) }));
    }
  }, [form.start_date, form.end_date, nameManuallyEdited]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.start_date || !form.end_date) return;

    startTransition(async () => {
      try {
        const { cycleId } = await createCycle({
          name: form.name,
          start_date: form.start_date,
          end_date: form.end_date,
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

      {/* Modal — NO overflow-hidden so date picker isn't clipped */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100 dark:border-white/5 shrink-0 rounded-t-[2.5rem]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
              <CalendarRange className="w-5 h-5 text-primary dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                New Cycle
              </h2>
              <p className="text-[10px] text-secondary dark:text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                <Copy className="w-3 h-3" />
                Budget limits auto-copied from last cycle
              </p>
            </div>
          </div>
          <button
            onClick={() => !isPending && onClose()}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer text-slate-600 dark:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form — scrollable */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1 rounded-b-[2.5rem]">
          {/* Cycle Name */}
          <div>
            <label className={labelClass}>Cycle Name</label>
            <input
              type="text"
              placeholder="e.g. 25 APR – 24 MEI 2026"
              value={form.name}
              onChange={(e) => {
                setNameManuallyEdited(true);
                setForm((f) => ({ ...f, name: e.target.value }));
              }}
              required
              className={inputClass}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <DateField
              label="Start Date"
              value={form.start_date}
              onChange={(v) => setForm((f) => ({ ...f, start_date: v }))}
            />
            <DateField
              label="End Date"
              value={form.end_date}
              onChange={(v) => setForm((f) => ({ ...f, end_date: v }))}
            />
          </div>

          {/* Budget copy notice */}
          <div className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl px-4 py-3">
            <Copy className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 leading-relaxed">
              Budget limits dari cycle sebelumnya akan otomatis disalin ke cycle baru ini.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending || success}
            className={`w-full h-12 rounded-2xl text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer
              ${success
                ? "bg-emerald-500 text-white"
                : "bg-primary hover:bg-blue-700 text-white shadow-lg shadow-primary/20 disabled:opacity-60"
              }`}
          >
            {success ? (
              <><CheckCircle2 className="w-5 h-5" /> Cycle Created!</>
            ) : isPending ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Creating...</>
            ) : (
              <><Plus className="w-5 h-5" /> Create Cycle</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewCycleButton() {
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
        <NewCycleModal onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
