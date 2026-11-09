import Modal from "./Modal.jsx";
export default function ConfirmDialog({ title, message, onCancel, onConfirm, confirmLabel = "Delete" }) {
  return <Modal title={title} onClose={onCancel}>
    <div className="confirm-content"><p>{message}</p>
      <div className="modal-actions"><button className="button button-secondary" onClick={onCancel}>Cancel</button>
        <button className="button button-danger" onClick={onConfirm}>{confirmLabel}</button></div>
    </div>
  </Modal>;
}
