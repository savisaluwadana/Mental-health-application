"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MoodSparkline } from "@/components/ui/MoodSparkline";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function PractitionerClientsPage() {
  const { clients, moods } = useAppContext();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Clients</h1>
      </div>

      <div className="space-y-3">
        {clients.map((client) => {
          const moodSeries = moods
            .filter((item) => item.clientId === client.id)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(-10)
            .map((item) => item.score);

          return (
            <Card key={client.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 font-semibold text-sage-700">
                    {client.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{client.name}</p>
                    <p className="text-sm text-slate-600">
                      Joined {client.joinedAt} • Last session {client.lastSessionAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MoodSparkline values={moodSeries} />
                  <Badge
                    label={client.status}
                    variant={client.status === "attention" ? "missed" : client.status === "improving" ? "upcoming" : "completed"}
                  />
                  <Link href={`/practitioner/clients/${client.id}`} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
                    View
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
