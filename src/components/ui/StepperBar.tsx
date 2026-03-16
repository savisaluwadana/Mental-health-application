interface StepperBarProps {
  steps: string[];
  currentStep: number;
}

export function StepperBar({ steps, currentStep }: StepperBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const active = index <= currentStep;
          return (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  active ? "bg-sage-600 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 rounded ${active ? "bg-sage-500" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-sm text-slate-600">{steps[currentStep]}</p>
    </div>
  );
}
