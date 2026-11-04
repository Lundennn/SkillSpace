import './CodeInput.css';

export const CodeInput = ({
                            id = 'verification-code',
                            label = 'КОД ПОДТВЕРЖДЕНИЯ',
                            value,
                            onChange,
                            hint = 'Только 6 цифр',
                            error,
                          }) => {
  const handleInputChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 6);
    onChange(digitsOnly);
  };

  return (
    <div className="code-input-group">
      {label && (
        <label htmlFor={id} className="code-input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        className={`code-input-field ${error ? 'code-input-field--error' : ''}`}
        placeholder="0 0 0 0 0 0"
        value={value}
        onChange={handleInputChange}
        maxLength={6}
      />
      {error ? (
        <span className="code-input-error">{error}</span>
      ) : (
        hint && <span className="code-input-hint">{hint}</span>
      )}
    </div>
  );
};