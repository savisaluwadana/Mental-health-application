"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const tabs = ["Overview", "Sessions", "Mood & Check-ins", "Notes", "Goals"] as const;
type Tab = (typeof tabs)[number];

export default function PractitionerClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { clients, sessions, moods, checkIns, notes, goals, therapists } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const client = clients.find((item) => item.id === id);
  const therapistById = useMemo(() => {
    const map = new Map<string, string>();
    therapists.forEach((therapist) => map.set(therapist.id, therapist.name));
    return map;
  }, [therapists]);

  const clientSessions = sessions.filter((item) => item.clientId === id);
  const clientMoods = moods.filter((item) => item.clientId === id);
  const clientCheckins = checkIns.filter((item) => item.clientId === id);
  const clientNotes = notes.filter((item) => item.clientId === id);
  const clientGoals = goals.filter((item) => item.clientId === id);

  if (!client) {
    return <p className="text-sm text-slate-600">Client not found.</p>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <section className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-800">{client.name}</h1>
          <p className="text-sm text-slate-600">Age {client.age} • Joined {client.joinedAt}</p>
        </div>
        <Badge label={client.status} variant={client.status === "attention" ? "missed" : "upcoming"} />
      </section>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              activeTab === tab
                ? "border-sage-600 bg-sage-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <Card>
          <p className="text-sm text-slate-600">Wellbeing score</p>
          <p className="text-3xl font-semibold text-slate-800">{client.wellbeingScore}/100</p>
          <p className="mt-2 text-sm text-slate-700">Current focus: {client.goals.join(" • ")}</p>
        </Card>
      )}

      {activeTab === "Sessions" && (
        <Card className="space-y-2 text-sm">
          {clientSessions.map((session) => (
            <div key={session.id} className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">
              <p className="font-medium">{session.date} • {session.startTime}</p>
              <p>{therapistById.get(session.therapistId)} • {session.type}</p>
              <Badge label={session.status} variant={session.status} />
            </div>
          ))}
        </Card>
      )}

      {activeTab === "Mood & Check-ins" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="space-y-2">
            <p className="font-medium text-slate-800">Mood logs</p>
            {clientMoods.slice(0, 8).map((mood) => (
              <p key={mood.id} className="text-sm text-slate-700">
                {mood.date}: {mood.score}/5
              </p>
            ))}
          </Card>
          <Card className="space-y-2">
            <p className="font-medium text-slate-800">Check-ins</p>
            {clientCheckins.map((checkin) => (
              <p key={checkin.id} className="text-sm text-slate-700">
                {checkin.date}: score {checkin.totalScore}
              </p>
            ))}
          </Card>
        </div>
      )}

      {activeTab === "Notes" && (
        <Card className="space-y-2">
          {clientNotes.map((note) => (
            <div key={note.id} className="rounded-lg bg-slate-50 px-3 py-2">
              <p className="text-sm text-slate-700">{note.content}</p>
              <p className="text-xs text-slate-500">{note.date}</p>
            </div>
          ))}
        </Card>
      )}

      {activeTab === "Goals" && (
        <Card className="space-y-3">
          {clientGoals.map((goal) => (
            <div key={goal.id}>
              <div className="mb-1 flex justify-between text-sm text-slate-700">
                <span>{goal.title}</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="h-2 rounded bg-slate-200">
                <div className="h-full rounded bg-sage-600" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
