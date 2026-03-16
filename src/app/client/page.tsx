"use client";

import { Card } from "@/components/ui/Card";
import { MoodSparkline } from "@/components/ui/MoodSparkline";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function ClientDashboardPage() {
  const { clients, moods, sessions, activeClientId, therapists } = useAppContext();
  const client = clients.find((item) => item.id === activeClientId);
  const moodSeries = moods
    .filter((item) => item.clientId === activeClientId)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map((item) => item.score);

  const upcoming = sessions
    .filter((session) => session.clientId === activeClientId && session.status === "upcoming")
    .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))[0];

  const therapistName = therapists.find((t) => t.id === upcoming?.therapistId)?.name;

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-800">
          {getGreeting()}, {client?.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-slate-600">Your wellbeing snapshot for today is ready.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Wellbeing score</p>
              <p className="text-3xl font-semibold text-slate-800">{client?.wellbeingScore}/100</p>
            </div>
            <div>
              <p className="mb-1 text-right text-xs text-slate-500">14-day mood trend</p>
              <MoodSparkline values={moodSeries} />
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">Quick actions</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/client/book" className="block rounded-md bg-sage-100 px-3 py-2 font-medium text-sage-700">
              Book a session
            </Link>
            <Link href="/client/mood" className="block rounded-md bg-slate-100 px-3 py-2 text-slate-700">
              Log mood now
            </Link>
            <Link href="/client/checkin" className="block rounded-md bg-slate-100 px-3 py-2 text-slate-700">
              Submit weekly check-in
            </Link>
          </div>
        </Card>
      </div>

      <Card>
        <p className="text-sm text-slate-500">Upcoming session</p>
        {upcoming ? (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-800">{upcoming.date}</p>
              <p className="text-sm text-slate-600">
                {upcoming.startTime} - {upcoming.endTime} • {upcoming.type} with {therapistName}
              </p>
            </div>
            <Link href="/client/sessions" className="rounded-md bg-sage-600 px-4 py-2 text-sm font-medium text-white">
              View sessions
            </Link>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-600">No upcoming sessions. Schedule one to stay consistent.</p>
        )}
      </Card>
    </div>
  );
}
