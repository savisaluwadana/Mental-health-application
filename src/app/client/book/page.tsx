"use client";

import { Card } from "@/components/ui/Card";
import { StepperBar } from "@/components/ui/StepperBar";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const steps = ["Service", "Therapist", "Time Slot", "Confirm", "Payment"];
const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const getLocalDate = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
};

export default function BookSessionPage() {
  const { therapists, sessions, addSession, activeClientId } = useAppContext();
  const [step, setStep] = useState(0);
  const [service, setService] = useState("1:1 Therapy");
  const [therapistId, setTherapistId] = useState(therapists[0]?.id ?? "");
  const [date, setDate] = useState(getLocalDate());
  const [slot, setSlot] = useState(slots[0]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const therapist = useMemo(
    () => therapists.find((item) => item.id === therapistId),
    [therapists, therapistId],
  );

  const occupiedSlots = useMemo(() => {
    return new Set(
      sessions
        .filter(
          (session) =>
            session.therapistId === therapistId &&
            session.date === date &&
            session.status !== "missed",
        )
        .map((session) => session.startTime),
    );
  }, [sessions, therapistId, date]);

  const availableSlots = useMemo(
    () => slots.filter((value) => !occupiedSlots.has(value)),
    [occupiedSlots],
  );

  const selectedSlotAvailable = availableSlots.includes(slot);

  useEffect(() => {
    if (availableSlots.length > 0 && !availableSlots.includes(slot)) {
      setSlot(availableSlots[0]);
    }
  }, [availableSlots, slot]);

  const handleTherapistChange = (nextTherapistId: string) => {
    setTherapistId(nextTherapistId);
    setDone(false);
    setError(null);
  };

  const handleDateChange = (nextDate: string) => {
    setDate(nextDate);
    setDone(false);
    setError(null);
  };

  const next = () => {
    if (step === 2 && availableSlots.length === 0) {
      setError("No available time slots for this date. Please choose another date.");
      return;
    }

    if (step === 2 && !selectedSlotAvailable) {
      setError("Selected slot is no longer available. Please choose another slot.");
      return;
    }

    setError(null);
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const submitBooking = () => {
    if (!selectedSlotAvailable) {
      setError("Selected slot is unavailable. Please go back and choose a different time.");
      return;
    }

    if (done) {
      return;
    }

    const endHour = `${Math.min(Number(slot.slice(0, 2)) + 1, 23)}`.padStart(2, "0");
    addSession({
      clientId: activeClientId,
      therapistId,
      date,
      startTime: slot,
      endTime: `${endHour}:${slot.slice(3)}`,
      type: "Video",
      note: `Booked via ${service}`,
      status: "upcoming",
    });
    setDone(true);
    setError(null);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Book Session</h1>
      </div>
      <Card>
        <StepperBar steps={steps} currentStep={step} />
      </Card>

      <Card className="space-y-4">
        {step === 0 && (
          <div className="space-y-3">
            <p className="font-medium text-slate-800">Choose service</p>
            {["1:1 Therapy", "Mindfulness Coaching", "Follow-up Session"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setService(item)}
                className={`block w-full rounded-md border px-3 py-2 text-left ${
                  service === item
                    ? "border-sage-600 bg-sage-100 ring-2 ring-sage-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                aria-pressed={service === item}
              >
                <span className="flex items-center justify-between gap-2">
                  <span>{item}</span>
                  {service === item ? <span className="text-xs font-semibold text-sage-700">Selected</span> : null}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-3 md:grid-cols-2">
            {therapists.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleTherapistChange(item.id)}
                className={`rounded-md border p-3 text-left ${
                  therapistId === item.id
                    ? "border-sage-600 bg-sage-100 ring-2 ring-sage-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                aria-pressed={therapistId === item.id}
              >
                <p className="font-semibold text-slate-800">{item.name}</p>
                <p className="text-sm text-slate-600">{item.specializations.join(" • ")}</p>
                <p className="mt-1 text-sm text-slate-600">LKR {item.priceLkr.toLocaleString()} / session</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Select date</label>
            <input
              type="date"
              value={date}
              min={getLocalDate()}
              onChange={(e) => handleDateChange(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            {availableSlots.length === 0 && (
              <p className="text-sm text-amber-700">No slots available for this date. Pick another date.</p>
            )}
            <div className="flex flex-wrap gap-2">
              {slots.map((value) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setSlot(value)}
                  disabled={occupiedSlots.has(value)}
                  className={`rounded-full px-3 py-1.5 text-sm ${
                    occupiedSlots.has(value)
                      ? "cursor-not-allowed bg-slate-100 text-slate-400"
                      : value === slot
                        ? "bg-sage-600 text-white"
                        : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {value} {occupiedSlots.has(value) ? "(Booked)" : ""}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-medium">Service:</span> {service}
            </p>
            <p>
              <span className="font-medium">Therapist:</span> {therapist?.name}
            </p>
            <p>
              <span className="font-medium">Date & time:</span> {date} at {slot}
            </p>
            <p>
              <span className="font-medium">Session fee:</span> LKR {therapist?.priceLkr.toLocaleString()}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-700">Simulated payment gateway for demo mode.</p>
            <button
              type="button"
              onClick={submitBooking}
              disabled={done || !selectedSlotAvailable}
              className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-45"
            >
              Pay and Confirm
            </button>
            {done && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-emerald-700">Payment successful. Session confirmed.</p>
                <Link href="/client/sessions" className="inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  View My Sessions
                </Link>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-sm font-medium text-rose-700">{error}</p>}

        <div className="flex justify-between pt-2">
          <button type="button" onClick={back} disabled={step === 0} className="rounded-md border px-3 py-2 text-sm disabled:opacity-40">
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={step >= steps.length - 1 || (step === 2 && availableSlots.length === 0)}
            className="rounded-md bg-sage-600 px-3 py-2 text-sm text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </Card>
    </div>
  );
}
