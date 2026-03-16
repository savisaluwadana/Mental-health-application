import { X } from "lucide-react";
import { type ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Drawer({ open, title, onClose, children }: DrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm" onClick={onClose} aria-label="Close drawer" />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-slate-200/80 bg-white p-5 shadow-[0_22px_70px_-28px_rgba(15,23,42,0.6)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button className="rounded-lg p-1 text-slate-500 hover:bg-slate-100" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
