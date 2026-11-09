import { Pencil, Trash2 } from "lucide-react";

export default function RowActions({ onEdit, onDelete }) {
  return (
    <div className="row-actions">
      <button aria-label="Edit record" title="Edit" onClick={onEdit}>
        <Pencil size={15} />
      </button>
      <button aria-label="Delete record" title="Delete" onClick={onDelete}>
        <Trash2 size={15} />
      </button>
    </div>
  );
}
