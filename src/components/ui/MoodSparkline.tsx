interface MoodSparklineProps {
  values: number[];
  className?: string;
}

export function MoodSparkline({ values, className = "" }: MoodSparklineProps) {
  const width = 120;
  const height = 36;
  const max = 5;
  const min = 1;

  if (!values.length) {
    return <div className={`h-9 w-28 rounded bg-slate-100 ${className}`} />;
  }

  const step = values.length > 1 ? width / (values.length - 1) : width;

  const points = values
    .map((value, index) => {
      const x = index * step;
      const normalized = (value - min) / (max - min);
      const y = height - normalized * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`h-9 w-28 ${className}`}>
      <polyline fill="none" stroke="currentColor" strokeWidth="2.5" points={points} className="text-sage-600" />
    </svg>
  );
}
