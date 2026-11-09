export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {payload.map((item) => (
        <span key={item.dataKey}>
          <i style={{ backgroundColor: item.color }} />
          {item.name}: {item.value}
          {item.dataKey === "rate" ? "%" : "%"}
        </span>
      ))}
    </div>
  );
}
