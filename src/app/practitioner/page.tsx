"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function PractitionerDashboardPage() {
  const { sessions, clients, activityFeed, therapists, activeTherapistId } = useAppContext();
  const therapist = therapists.find((item) => item.id === activeTherapistId);
  const today = new Date().toISOString().slice(0, 10);

  const therapistSessions = sessions.filter((session) => session.therapistId === activeTherapistId);

  const todaysSessions = therapistSessions
    .filter((session) => session.date === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const nextSession = therapistSessions
    .filter((session) => session.status === "upcoming")
    .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))[0];

  const completedCount = therapistSessions.filter((session) => session.status === "completed").length;
  const completionRate = therapistSessions.length
    ? Math.round((completedCount / therapistSessions.length) * 100)
    : 0;

  const flaggedClients = clients.filter((client) => client.flags.length > 0);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Practitioner Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Welcome back, {therapist?.name}</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs text-slate-500">Today&apos;s sessions</p>
          <p className="text-3xl font-semibold text-slate-800">{todaysSessions.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Active clients</p>
          <p className="text-3xl font-semibold text-slate-800">{clients.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Flagged clients</p>
          <p className="text-3xl font-semibold text-slate-800">{flaggedClients.length}</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm text-slate-500">Next session</p>
          {nextSession ? (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-800">{nextSession.date}</p>
                <p className="text-sm text-slate-600">
                  {nextSession.startTime} - {nextSession.endTime} • {clients.find((c) => c.id === nextSession.clientId)?.name}
                </p>
              </div>
              <Link href="/practitioner/schedule" className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
                Open schedule
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-600">No upcoming sessions scheduled.</p>
          )}
        </Card>

        <Card>
          <p className="text-xs text-slate-500">Completion rate</p>
          <p className="text-3xl font-semibold text-slate-800">{completionRate}%</p>
          <p className="mt-1 text-xs text-slate-500">
            {completedCount} completed of {therapistSessions.length} sessions
          </p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="mb-3 font-medium text-slate-800">Today&apos;s schedule</p>
          <div className="space-y-3 text-sm">
            {todaysSessions.length === 0 && <p className="text-slate-600">No sessions scheduled for today.</p>}
            {todaysSessions.map((session) => {
              const client = clients.find((item) => item.id === session.clientId);
              return (
                <div key={session.id} className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="font-medium text-slate-700">{session.startTime} • {client?.name}</p>
                  <div className="mt-1">
                    <Badge label={session.status} variant={session.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <p className="mb-3 font-medium text-slate-800">Flagged clients</p>
          <div className="space-y-3 text-sm">
            {flaggedClients.map((client) => (
              <div key={client.id} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <p className="font-medium text-slate-800">{client.name}</p>
                <p className="text-slate-600">{client.flags.join(" • ")}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <p className="mb-3 font-medium text-slate-800">Recent activity</p>
        <div className="space-y-2 text-sm text-slate-700">
          {activityFeed.slice(0, 6).map((item) => (
            <div key={item.id} className="rounded-lg bg-slate-50 px-3 py-2">
              <p>{item.message}</p>
              <p className="text-xs text-slate-500">{item.date}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link href="/practitioner/clients" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
          Manage clients
        </Link>
        <Link href="/practitioner/schedule" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
          Manage schedule
        </Link>
      </div>
    </div>
  );
}
