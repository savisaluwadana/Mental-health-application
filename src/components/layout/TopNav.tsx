"use client";

import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function TopNav() {
  const { role, setRole, clients, therapists, activeClientId, activeTherapistId } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/practitioner") && role !== "practitioner") {
      setRole("practitioner");
    }
    if (pathname.startsWith("/client") && role !== "client") {
      setRole("client");
    }
  }, [pathname, role, setRole]);

  const currentUser = role === "client"
    ? clients.find((client) => client.id === activeClientId)
    : therapists.find((therapist) => therapist.id === activeTherapistId);

  const applyRole = (nextRole: "client" | "practitioner") => {
    setRole(nextRole);
    if (nextRole === "client" && pathname.startsWith("/practitioner")) {
      router.push("/client");
    }
    if (nextRole === "practitioner" && pathname.startsWith("/client")) {
      router.push("/practitioner");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="rounded-lg px-2 py-1 hover:bg-white/80">
          <p className="text-xl font-semibold tracking-tight text-slate-800">MindCare Cloud</p>
          <p className="text-xs text-slate-500">Mental Health SaaS Platform</p>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden rounded-lg border border-slate-300/90 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50 md:inline-flex"
          >
            Landing Page
          </Link>

          <div className="flex rounded-full border border-slate-200 bg-white/90 p-1 text-sm shadow-sm">
            <button
              className={`rounded-full px-3 py-1 ${role === "practitioner" ? "bg-sage-600 text-white shadow-sm" : "text-slate-600"}`}
              onClick={() => applyRole("practitioner")}
            >
              Practitioner
            </button>
            <button
              className={`rounded-full px-3 py-1 ${role === "client" ? "bg-sage-600 text-white shadow-sm" : "text-slate-600"}`}
              onClick={() => applyRole("client")}
            >
              Client
            </button>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-sm font-semibold text-sage-700">
              {currentUser?.avatar ?? "U"}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">{currentUser?.name}</p>
              <p className="text-xs capitalize text-slate-500">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
