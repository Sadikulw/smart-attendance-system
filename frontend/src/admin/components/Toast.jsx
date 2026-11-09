import { X } from "lucide-react";
export default function Toast({ message, type = "success", onClose }) {
  if (!message) return null;
  return <div className={`toast toast-${type}`} role="status"><span className="toast-dot" />{message}
    <button aria-label="Dismiss notification" onClick={onClose}><X size={15} /></button>
  </div>;
}
