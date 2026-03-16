interface BadgeProps {
  label: string;
  variant?: "upcoming" | "completed" | "missed" | "video" | "inperson" | "default";
}

const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  upcoming: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-sky-50 text-sky-700 border-sky-200",
  missed: "bg-rose-50 text-rose-700 border-rose-200",
  video: "bg-violet-50 text-violet-700 border-violet-200",
  inperson: "bg-amber-50 text-amber-700 border-amber-200",
  default: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[variant]}`}>
      {label}
    </span>
  );
}
