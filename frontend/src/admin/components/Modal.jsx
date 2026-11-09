import { X } from "lucide-react";
export default function Modal({ title, description, onClose, children, wide = false }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section className={`modal ${wide ? "modal-wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
      <header className="modal-header"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>
        <button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
      </header>
      {children}
    </section>
  </div>;
}
