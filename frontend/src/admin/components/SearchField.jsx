import { Search, X } from "lucide-react";
export default function SearchField({ value, onChange, placeholder = "Search..." }) {
  return <label className="search-field">
    <Search size={16} aria-hidden="true" />
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    {value && <button type="button" aria-label="Clear search" onClick={() => onChange("")}><X size={14} /></button>}
  </label>;
}
