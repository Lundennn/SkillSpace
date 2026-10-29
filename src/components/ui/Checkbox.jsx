import './Checkbox.css';

export const Checkbox = ({ label, checked, onChange, required }) => {
  return (
    <label className="checkbox-group">
      <input
        type="checkbox"
        className="checkbox-input"
        checked={checked}
        onChange={onChange}
        required={required}
      />
      <span className="checkbox-custom" aria-hidden="true" />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};