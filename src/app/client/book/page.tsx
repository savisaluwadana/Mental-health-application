"use client";

import { Card } from "@/components/ui/Card";
import { StepperBar } from "@/components/ui/StepperBar";
import { useAppContext } from "@/context/AppContext";
import { useMemo, useState } from "react";

const steps = ["Service", "Therapist", "Time Slot", "Confirm", "Payment"];
const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

export default function BookSessionPage() {
  const { therapists, addSession, activeClientId } = useAppContext();
  const [step, setStep] = useState(0);
  const [service, setService] = useState("1:1 Therapy");
  const [therapistId, setTherapistId] = useState(therapists[0]?.id ?? "");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slot, setSlot] = useState(slots[0]);
  const [done, setDone] = useState(false);

  const therapist = useMemo(
    () => therapists.find((item) => item.id === therapistId),
    [therapists, therapistId],
  );

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const submitBooking = () => {
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
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">Book Session</h1>
      <Card>
        <StepperBar steps={steps} currentStep={step} />
      </Card>

      <Card className="space-y-4">
        {step === 0 && (
          <div className="space-y-3">
            <p className="font-medium text-slate-800">Choose service</p>
            {["1:1 Therapy", "Mindfulness Coaching", "Follow-up Session"].map((item) => (
              <button
                key={item}
                onClick={() => setService(item)}
                className={`block w-full rounded-md border px-3 py-2 text-left ${
                  service === item ? "border-sage-600 bg-sage-50" : "border-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-3 md:grid-cols-2">
            {therapists.map((item) => (
              <button
                key={item.id}
                onClick={() => setTherapistId(item.id)}
                className={`rounded-md border p-3 text-left ${
                  therapistId === item.id ? "border-sage-600 bg-sage-50" : "border-slate-200"
                }`}
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
              onChange={(e) => setDate(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            />
            <div className="flex flex-wrap gap-2">
              {slots.map((value) => (
                <button
                  key={value}
                  onClick={() => setSlot(value)}
                  className={`rounded-full px-3 py-1.5 text-sm ${
                    value === slot ? "bg-sage-600 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {value}
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
            <button onClick={submitBooking} className="rounded-md bg-sage-600 px-4 py-2 text-sm font-medium text-white">
              Pay and Confirm
            </button>
            {done && <p className="text-sm font-medium text-emerald-700">Payment successful. Session confirmed.</p>}
          </div>
        )}

        <div className="flex justify-between pt-2">
          <button onClick={back} disabled={step === 0} className="rounded-md border px-3 py-2 text-sm disabled:opacity-40">
            Back
          </button>
          <button
            onClick={next}
            disabled={step >= steps.length - 1}
            className="rounded-md bg-sage-600 px-3 py-2 text-sm text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </Card>
    </div>
  );
}
