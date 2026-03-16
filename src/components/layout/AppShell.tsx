"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname.startsWith("/client") || pathname.startsWith("/practitioner");

  if (!isAppRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef6f0_0%,#f8fafc_40%,#fafaf9_100%)] text-slate-700">
      <TopNav />
      <div className="mx-auto flex w-full max-w-7xl gap-4 px-2 md:px-4">
        <Sidebar />
        <main className="w-full p-4 pb-24 md:p-6 md:pb-8">{children}</main>
      </div>
    </div>
  );
}
