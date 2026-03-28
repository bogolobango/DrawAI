interface ScheduleTableProps {
  title: string;
  columns: Array<{ key: string; label: string; width?: string }>;
  rows: Array<Record<string, string | number>>;
}

export default function ScheduleTable({
  title,
  columns,
  rows,
}: ScheduleTableProps) {
  return (
    <div className="glass-panel overflow-hidden">
      <div className="border-b border-[var(--color-border-light)] px-5 py-3">
        <h3 className="text-sm font-semibold text-[var(--color-text)]">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-light)] bg-white/30">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[var(--color-border-light)] last:border-0 hover:bg-white/20 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="whitespace-nowrap px-4 py-2.5 text-[var(--color-text)] font-mono text-xs"
                  >
                    {row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
