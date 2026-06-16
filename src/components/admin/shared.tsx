import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/admin-data";

export function StatCard({
  label, value, hint, icon, trend,
}: { label: string; value: ReactNode; hint?: string; icon?: ReactNode; trend?: { dir: "up" | "down"; text: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        {icon && <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">{icon}</div>}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {trend && (
          <span className={cn(trend.dir === "up" ? "text-emerald-400" : "text-rose-400", "font-medium")}>
            {trend.dir === "up" ? "▲" : "▼"} {trend.text}
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </motion.div>
  );
}

const statusStyles: Record<LeadStatus, string> = {
  "New": "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "Contacted": "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  "Follow Up": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Interested": "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "Negotiation": "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "Won": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "Lost": "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", statusStyles[status])}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function VehicleStatusBadge({ status }: { status: "Published" | "Draft" | "Sold" | "Reserved" }) {
  const map = {
    Published: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Draft: "bg-muted text-muted-foreground border-border",
    Sold: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    Reserved: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", map[status])}>
      {status}
    </span>
  );
}

export function SectionCard({ title, action, children, className }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 shadow-sm", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-sm font-semibold tracking-wide">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
