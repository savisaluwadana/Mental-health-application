"use client";

import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { useAppContext } from "@/context/AppContext";
import { useMemo, useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 13 }, (_, index) => 8 + index);

const formatHour = (hour: number) => `${hour.toString().padStart(2, "0")}:00`;

const getLocalDate = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

export default function PractitionerSchedulePage() {
  const { sessions, clients, activeTherapistId, addSession } = useAppContext();
  const [open, setOpen] = useState(false);
  const [clientId, setClientId] = useState(clients[0]?.id ?? "c1");
  const [date, setDate] = useState(getLocalDate());
  const [time, setTime] = useState("10:00");
  const [error, setError] = useState<string | null>(null);

  const weekDates = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);

    return Array.from({ length: 7 }, (_, index) => {
      const current = new Date(monday);
      current.setDate(monday.getDate() + index);
      return current.toISOString().slice(0, 10);
    });
  }, []);

  const sessionsThisWeek = sessions.filter(
    (session) => session.therapistId === activeTherapistId && weekDates.includes(session.date),
  );

  const hasConflict = sessions.some(
    (session) =>
      session.therapistId === activeTherapistId &&
      session.date === date &&
      session.startTime === time &&
      session.status !== "missed",
  );

  const addNewSession = () => {
    if (hasConflict) {
      setError("That time is already booked. Please choose another time.");
      return;
    }

    const endHour = `${Math.min(Number(time.slice(0, 2)) + 1, 23)}`.padStart(2, "0");
    addSession({
      clientId,
      therapistId: activeTherapistId,
      date,
      startTime: time,
      endTime: `${endHour}:${time.slice(3)}`,
      type: "Video",
      status: "upcoming",
    });
    setError(null);
    setOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Weekly Schedule</h1>
        <button onClick={() => setOpen(true)} className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
          Add Session
        </button>
      </div>

      <Card className="overflow-x-auto p-0">
        <div className="min-w-[860px]">
          <div className="grid grid-cols-8 border-b border-slate-200 bg-slate-50/80 text-sm font-medium text-slate-600">
            <div className="p-3">Time</div>
            {days.map((day, index) => (
              <div key={day} className="border-l border-slate-200 p-3">
                {day}
                <p className="text-xs text-slate-500">{weekDates[index].slice(5)}</p>
              </div>
            ))}
          </div>

          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 text-sm">
              <div className="border-b border-slate-200 p-3 text-slate-500">{formatHour(hour)}</div>
              {weekDates.map((dayDate) => {
                const block = sessionsThisWeek.find(
                  (session) => session.date === dayDate && Number(session.startTime.slice(0, 2)) === hour,
                );
                const client = clients.find((item) => item.id === block?.clientId);

                return (
                  <div key={`${dayDate}-${hour}`} className="min-h-16 border-b border-l border-slate-200 p-1.5">
                    {block ? (
                      <div className="rounded-lg bg-sage-100 p-2 text-xs text-slate-700">
                        <p className="font-medium">{client?.name}</p>
                        <p>{block.startTime} - {block.endTime}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      <Modal open={open} title="Add Session" onClose={() => setOpen(false)}>
        <div className="space-y-3 text-sm">
          <label className="block">
            Client
            <select
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            Date
            <input
              type="date"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              value={date}
              min={getLocalDate()}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="block">
            Time
            <input
              type="time"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              value={time}
              step={3600}
              onChange={(e) => {
                setTime(e.target.value);
                setError(null);
              }}
            />
          </label>

          {hasConflict && <p className="text-sm font-medium text-rose-700">That time is already booked.</p>}
          {error && <p className="text-sm font-medium text-rose-700">{error}</p>}

          <button
            onClick={addNewSession}
            disabled={hasConflict}
            className="rounded-lg bg-sage-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            Save session
          </button>
        </div>
      </Modal>
    </div>
  );
}