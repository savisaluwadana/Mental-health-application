"use client";

import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ClientProgressPage() {
  const { goals, sessions, checkIns, activeClientId } = useAppContext();

  const clientGoals = goals.filter((goal) => goal.clientId === activeClientId);
  const clientSessions = sessions.filter((session) => session.clientId === activeClientId);
  const completed = clientSessions.filter((session) => session.status === "completed").length;
  const attendanceRate = clientSessions.length ? Math.round((completed / clientSessions.length) * 100) : 0;

  const checkinSeries = checkIns
    .filter((checkIn) => checkIn.clientId === activeClientId)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Progress</h1>

      <Card>
        <p className="mb-3 text-sm text-slate-500">Active goals</p>
        <div className="space-y-3">
          {clientGoals.map((goal) => (
            <div key={goal.id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-700">{goal.title}</span>
                <span className="font-medium text-slate-700">{goal.progress}%</span>
              </div>
              <div className="h-2 rounded bg-slate-200">
                <div className="h-full rounded bg-sage-600" style={{ width: `${goal.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-slate-500">Attendance rate</p>
          <p className="text-3xl font-semibold text-slate-800">{attendanceRate}%</p>
          <p className="text-sm text-slate-600">{completed} completed of {clientSessions.length} sessions</p>
        </Card>

        <Card>
          <p className="mb-2 text-sm text-slate-500">Check-in trend</p>
          <Line
            data={{
              labels: checkinSeries.map((item) => item.date.slice(5)),
              datasets: [
                {
                  label: "Score",
                  data: checkinSeries.map((item) => item.totalScore),
                  borderColor: "#6B8F71",
                  tension: 0.3,
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </Card>
      </div>
    </div>
  );
}
