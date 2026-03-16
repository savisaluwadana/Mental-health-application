"use client";

import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const moodEmoji = ["😣", "😕", "😐", "🙂", "😄"];

export default function ClientMoodPage() {
  const { moods, activeClientId, addMoodLog } = useAppContext();
  const [score, setScore] = useState(4);
  const [note, setNote] = useState("");

  const dataPoints = useMemo(
    () =>
      moods
        .filter((item) => item.clientId === activeClientId)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-30),
    [moods, activeClientId],
  );

  const chartData = {
    labels: dataPoints.map((item) => item.date.slice(5)),
    datasets: [
      {
        label: "Mood score",
        data: dataPoints.map((item) => item.score),
        borderColor: "#6B8F71",
        backgroundColor: "rgba(107, 143, 113, 0.12)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Mood Tracker</h1>

      <Card className="space-y-4">
        <p className="font-medium text-slate-800">How are you feeling right now?</p>
        <div className="flex flex-wrap gap-2">
          {moodEmoji.map((emoji, index) => {
            const value = index + 1;
            return (
              <button
                key={emoji}
                onClick={() => setScore(value)}
                className={`rounded-full px-3 py-2 text-2xl ${
                  value === score ? "bg-sage-100 ring-2 ring-sage-600" : "bg-slate-100"
                }`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
        <textarea
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          className="rounded-md bg-sage-600 px-4 py-2 text-sm font-medium text-white"
          onClick={() => {
            addMoodLog({ clientId: activeClientId, score, note });
            setNote("");
          }}
        >
          Log mood
        </button>
      </Card>

      <Card>
        <p className="mb-3 text-sm text-slate-500">30-day trend</p>
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: { min: 1, max: 5, ticks: { stepSize: 1 } },
            },
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </Card>

      <Card>
        <p className="mb-2 text-sm text-slate-500">Recent logs</p>
        <div className="space-y-2 text-sm">
          {[...dataPoints].reverse().slice(0, 8).map((item) => (
            <div key={item.id} className="rounded-md bg-slate-50 px-3 py-2">
              <p className="font-medium text-slate-700">
                {item.date} • Score {item.score}
              </p>
              {item.note && <p className="text-slate-600">{item.note}</p>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
