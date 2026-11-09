import { ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, note, icon: Icon, tone = "purple", trend }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon stat-${tone}`}>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <p>{label}</p>
      <strong className="stat-value">{value}</strong>
      <div className="stat-note">
        {trend && (
          <span className="stat-trend">
            <ArrowUpRight size={13} />
            {trend}
          </span>
        )}
        <span>{note}</span>
      </div>
    </article>
  );
}
