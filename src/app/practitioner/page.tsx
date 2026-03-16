"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";

export default function PractitionerDashboardPage() {
  const { sessions, clients, activityFeed, therapists, activeTherapistId } = useAppContext();
  const therapist = therapists.find((item) => item.id === activeTherapistId);
  const today = new Date().toISOString().slice(0, 10);

  const todaysSessions = sessions.filter(
    (session) => session.therapistId === activeTherapistId && session.date === today,
  );

  const flaggedClients = clients.filter((client) => client.flags.length > 0);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-800">Practitioner Dashboard</h1>
        <p className="text-sm text-slate-600">Welcome back, {therapist?.name}</p>
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="mb-3 font-medium text-slate-800">Today&apos;s schedule</p>
          <div className="space-y-3 text-sm">
            {todaysSessions.length === 0 && <p className="text-slate-600">No sessions scheduled for today.</p>}
            {todaysSessions.map((session) => {
              const client = clients.find((item) => item.id === session.clientId);
              return (
                <div key={session.id} className="rounded-md bg-slate-50 px-3 py-2">
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
              <div key={client.id} className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
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
            <div key={item.id} className="rounded-md bg-slate-50 px-3 py-2">
              <p>{item.message}</p>
              <p className="text-xs text-slate-500">{item.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
