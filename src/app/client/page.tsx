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
  const { clients, moods, sessions, checkIns, activeClientId, therapists } = useAppContext();
  const client = clients.find((item) => item.id === activeClientId);
  const clientSessions = sessions.filter((session) => session.clientId === activeClientId);
  const completedSessions = clientSessions.filter((session) => session.status === "completed").length;

  const moodSeries = moods
    .filter((item) => item.clientId === activeClientId)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map((item) => item.score);

  const recentMoodAverage = moodSeries.length
    ? (moodSeries.reduce((sum, value) => sum + value, 0) / moodSeries.length).toFixed(1)
    : "0.0";

  const latestCheckIn = checkIns
    .filter((item) => item.clientId === activeClientId)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  const upcoming = sessions
    .filter((session) => session.clientId === activeClientId && session.status === "upcoming")
    .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))[0];

  const therapistName = therapists.find((t) => t.id === upcoming?.therapistId)?.name;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">
          {getGreeting()}, {client?.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-slate-600">Your wellbeing snapshot for today is ready.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-xs text-slate-500">Wellbeing score</p>
          <p className="text-2xl font-semibold text-slate-800">{client?.wellbeingScore ?? 0}/100</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Completed sessions</p>
          <p className="text-2xl font-semibold text-slate-800">{completedSessions}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Mood avg (14 days)</p>
          <p className="text-2xl font-semibold text-slate-800">{recentMoodAverage}/5</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Latest check-in</p>
          <p className="text-2xl font-semibold text-slate-800">
            {latestCheckIn ? latestCheckIn.totalScore : "—"}
          </p>
        </Card>
      </div>

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
            <Link href="/client/book" className="block rounded-lg bg-sage-100 px-3 py-2 font-medium text-sage-700 hover:bg-sage-200">
              Book a session
            </Link>
            <Link href="/client/mood" className="block rounded-lg bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200">
              Log mood now
            </Link>
            <Link href="/client/checkin" className="block rounded-lg bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200">
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
            <div className="flex items-center gap-2">
              <Link href="/client/sessions" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                View sessions
              </Link>
              <Link href={`/client/sessions/${upcoming.id}/meet`} className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
                Join meet
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-slate-600">No upcoming sessions. Schedule one to stay consistent.</p>
        )}
      </Card>
    </div>
  );
}
