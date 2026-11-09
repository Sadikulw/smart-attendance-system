export default function StatusBadge({ children }) {
  const status = String(children || "").toLowerCase();
  return <span className={`status-badge status-${status.replace(/\s+/g, "-")}`}><i />{children}</span>;
}
