"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-700">
      <TopNav />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="w-full p-4 pb-24 md:p-6 md:pb-6">{children}</main>
      </div>
    </div>
  );
}
