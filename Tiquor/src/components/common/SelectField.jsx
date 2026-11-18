import { ChevronDown } from 'lucide-react';

// options: [{ id, label }]
function SelectField({ label, value, options, onChange }) {
  return (
    <label className="na-select">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option value={option.id} key={option.id}>{option.label}</option>)}
      </select>
      <ChevronDown size={15} />
    </label>
  );
}

export default SelectField;
