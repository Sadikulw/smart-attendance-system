export default function SelectField({ value, onChange, options, label }) {
  return <label className="filter-field">
    {label && <span>{label}</span>}
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </label>;
}
