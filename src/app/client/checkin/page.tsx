"use client";

import { Card } from "@/components/ui/Card";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble relaxing",
  "Feeling easily overwhelmed",
  "Difficulty sleeping or resting",
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export default function ClientCheckinPage() {
  const { submitCheckIn, activeClientId } = useAppContext();
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState<number | null>(null);

  const setAnswer = (index: number, value: number) => {
    setAnswers((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleSubmit = () => {
    submitCheckIn({ clientId: activeClientId, answers });
    setSubmitted(answers.reduce((sum, item) => sum + item, 0));
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">Weekly Check-in</h1>
      </div>

      <Card className="space-y-4">
        {questions.map((question, index) => (
          <div key={question} className="space-y-2">
            <p className="font-medium text-slate-700">{index + 1}. {question}</p>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setAnswer(index, option.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm ${
                    answers[index] === option.value
                      ? "bg-sage-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleSubmit} className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
          Submit check-in
        </button>
      </Card>

      {submitted !== null && (
        <Card className="bg-sage-50">
          <p className="text-sm text-slate-600">Check-in score</p>
          <p className="text-3xl font-semibold text-slate-800">{submitted}</p>
          <p className="mt-1 text-sm text-slate-700">
            {submitted <= 5
              ? "You are maintaining balance well. Keep nurturing your routines."
              : submitted <= 10
                ? "You may be carrying moderate stress. Gentle consistency can help this week."
                : "You seem to be under heavy pressure. Reach out and prioritise support."}
          </p>
        </Card>
      )}
    </div>
  );
}
