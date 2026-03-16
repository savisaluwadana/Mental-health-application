"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Drawer } from "@/components/ui/Drawer";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
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
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">My Sessions</h1>
      </div>

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
            className={`rounded-full border px-3 py-1.5 text-sm capitalize ${
              filter === item
                ? "border-sage-600 bg-sage-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card>
            <p className="text-sm text-slate-600">No sessions in this filter yet.</p>
          </Card>
        )}

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
                  {session.status === "upcoming" && (
                    <Link
                      href={`/client/sessions/${session.id}/meet`}
                      className="rounded-lg bg-sage-600 px-3 py-1.5 text-sm font-medium text-white"
                    >
                      Join Meet
                    </Link>
                  )}
                  <button
                    onClick={() => setSelectedSessionId(session.id)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Drawer open={Boolean(selected)} title="Session Details" onClose={() => setSelectedSessionId(null)}>
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
              <span className="font-medium">Status:</span> {selected.status}
            </p>
            <p>
              <span className="font-medium">Type:</span> {selected.type}
            </p>
            <p>
              <span className="font-medium">Summary:</span> {selected.summary ?? "No summary available yet."}
            </p>
            <p>
              <span className="font-medium">Notes:</span> {selected.note ?? "No notes available."}
            </p>
            {selected.status === "upcoming" && (
              <Link
                href={`/client/sessions/${selected.id}/meet`}
                className="inline-block rounded-lg bg-sage-600 px-3 py-2 text-sm font-medium text-white"
              >
                Join secure meetup
              </Link>
            )}
          </div>
        ) : null}
      </Drawer>
    </div>
  );
}
