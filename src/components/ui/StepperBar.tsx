interface StepperBarProps {
  steps: string[];
  currentStep: number;
}

export function StepperBar({ steps, currentStep }: StepperBarProps) {
  const progress = steps.length > 1 ? currentStep / (steps.length - 1) : 0;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto pb-1">
        <div className="relative min-w-[520px]">
          <div className="absolute left-4 right-4 top-3 h-1 rounded bg-slate-200" />
          <div
            className="absolute left-4 top-3 h-1 rounded bg-sage-500 transition-all"
            style={{ width: `calc((100% - 2rem) * ${progress})` }}
          />

          <div className="relative flex items-start justify-between gap-2">
            {steps.map((step, index) => {
              const active = index <= currentStep;
              return (
                <div key={step} className="flex w-20 flex-col items-center text-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                      active ? "bg-sage-600 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="text-sm text-slate-600">{steps[currentStep]}</p>
    </div>
  );
}
