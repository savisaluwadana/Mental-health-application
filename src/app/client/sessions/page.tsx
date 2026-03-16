"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Drawer";
import { useAppContext } from "@/context/AppContext";
import { useMemo, useState } from "react";

const filters = ["all", "upcoming", "completed", "missed"] as const;
type Filter = (typeof filters)[number];

export default function ClientSessionsPage() {
  const { sessions, activeClientId, therapists } = useAppContext();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const clientSessions = useMemo(
    () => sessions.filter((item) => item.clientId === activeClientId),
    [sessions, activeClientId],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return clientSessions;
    return clientSessions.filter((item) => item.status === filter);
  }, [clientSessions, filter]);

  const selected = clientSessions.find((item) => item.id === selectedSessionId);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold text-slate-800">My Sessions</h1>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-2xl font-semibold text-slate-800">{clientSessions.length}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Completed</p>
          <p className="text-2xl font-semibold text-slate-800">
            {clientSessions.filter((s) => s.status === "completed").length}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Upcoming</p>
          <p className="text-2xl font-semibold text-slate-800">
            {clientSessions.filter((s) => s.status === "upcoming").length}
          </p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-3 py-1.5 text-sm capitalize ${
              filter === item ? "bg-sage-600 text-white" : "bg-slate-200 text-slate-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((session) => {
          const therapist = therapists.find((item) => item.id === session.therapistId);
          return (
            <Card key={session.id}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-800">{session.date}</p>
                  <p className="text-sm text-slate-600">
                    {session.startTime} - {session.endTime} • {therapist?.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge label={session.status} variant={session.status} />
                  <Badge label={session.type} variant={session.type === "Video" ? "video" : "inperson"} />
                  {session.status === "completed" && (
                    <button
                      onClick={() => setSelectedSessionId(session.id)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700"
                    >
                      View Summary
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Drawer open={Boolean(selected)} title="Session Summary" onClose={() => setSelectedSessionId(null)}>
        {selected ? (
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-medium">Date:</span> {selected.date}
            </p>
            <p>
              <span className="font-medium">Time:</span> {selected.startTime} - {selected.endTime}
            </p>
            <p>
              <span className="font-medium">Therapist:</span>{" "}
              {therapists.find((item) => item.id === selected.therapistId)?.name}
            </p>
            <p>
              <span className="font-medium">Summary:</span> {selected.summary ?? "No summary available yet."}
            </p>
            <p>
              <span className="font-medium">Notes:</span> {selected.note ?? "No notes available."}
            </p>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
