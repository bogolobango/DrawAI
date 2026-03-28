interface ConfidenceGaugeProps {
  label: string;
  score: number;
  maxScore?: number;
}

function getScoreColor(score: number): string {
  if (score >= 95) return "text-[var(--color-success)]";
  if (score >= 85) return "text-[var(--color-primary)]";
  if (score >= 70) return "text-[var(--color-warning)]";
  return "text-[var(--color-danger)]";
}

function getBarColor(score: number): string {
  if (score >= 95) return "bg-[var(--color-success)]";
  if (score >= 85) return "bg-[var(--color-primary)]";
  if (score >= 70) return "bg-[var(--color-warning)]";
  return "bg-[var(--color-danger)]";
}

export default function ConfidenceGauge({
  label,
  score,
  maxScore = 100,
}: ConfidenceGaugeProps) {
  const pct = (score / maxScore) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          {label}
        </span>
        <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
          {score.toFixed(1)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[var(--color-border-light)]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getBarColor(score)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
