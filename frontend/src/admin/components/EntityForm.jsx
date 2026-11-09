import { useState } from "react";
import Modal from "./Modal.jsx";

export default function EntityForm({ fields, initial, title, onClose, onSave }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        initial?.[field.key] ||
          (field.type === "select" ? field.options[0] : ""),
      ]),
    ),
  );
  const [error, setError] = useState("");
  function submit(event) {
    event.preventDefault();
    const required = fields.find(
      (field) => field.required && !String(values[field.key] || "").trim(),
    );
    if (required) {
      setError(`${required.label} is required.`);
      return;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (values.phone && !/^[+\d\s()-]{7,20}$/.test(values.phone)) {
      setError("Enter a valid phone number.");
      return;
    }
    onSave(values);
  }
  return (
    <Modal
      title={title}
      description="Fields marked with * are required."
      onClose={onClose}
    >
      <form className="entity-form" onSubmit={submit} noValidate>
        <div className="form-grid">
          {fields.map((field) => (
            <label className="form-field" key={field.key}>
              <span>
                {field.label}
                {field.required && <i> *</i>}
              </span>
              {field.type === "select" ? (
                <select
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues({ ...values, [field.key]: event.target.value })
                  }
                >
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  value={values[field.key]}
                  onChange={(event) =>
                    setValues({ ...values, [field.key]: event.target.value })
                  }
                />
              )}
            </label>
          ))}
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="button button-primary">
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
