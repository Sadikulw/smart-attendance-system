import { Search } from "lucide-react";
export default function EmptyState({ title, message }) {
  return <div className="empty-state"><div className="empty-mark"><Search size={20} /></div><h3>{title}</h3><p>{message}</p></div>;
}
