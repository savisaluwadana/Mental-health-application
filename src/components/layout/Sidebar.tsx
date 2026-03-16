"use client";

import { useAppContext } from "@/context/AppContext";
import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Compass,
  Home,
  LayoutGrid,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentType } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const clientItems: NavItem[] = [
  { label: "Dashboard", href: "/client", icon: Home },
  { label: "My Sessions", href: "/client/sessions", icon: Calendar },
  { label: "Book Session", href: "/client/book", icon: BookOpen },
  { label: "Mood Tracker", href: "/client/mood", icon: BarChart3 },
  { label: "Progress", href: "/client/progress", icon: Compass },
  { label: "Check-in", href: "/client/checkin", icon: ClipboardCheck },
];

const practitionerItems: NavItem[] = [
  { label: "Dashboard", href: "/practitioner", icon: LayoutGrid },
  { label: "Clients", href: "/practitioner/clients", icon: Users },
  { label: "Schedule", href: "/practitioner/schedule", icon: Calendar },
];

export function Sidebar() {
  const { role } = useAppContext();
  const pathname = usePathname();
  const items = role === "client" ? clientItems : practitionerItems;

  return (
    <>
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-20 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur">
          <nav className="space-y-1 p-2">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-sage-100 font-semibold text-sage-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
          </nav>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="flex items-center justify-around gap-2">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-0 flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] ${
                  active ? "bg-sage-100 text-sage-700" : "text-slate-500"
                }`}
              >
                <Icon size={16} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
