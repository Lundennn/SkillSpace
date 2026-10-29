import { useState } from 'react';
import { Icon } from './Icon';
import './Input.css';

export const Input = ({
                        id,
                        label,
                        labelAction,
                        type = 'text',
                        error,
                        hint,
                        ...props
                      }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="form-group">
      {(label || labelAction) && (
        <div className="form-label-row">
          {label && (
            <label htmlFor={id} className="form-label">
              {label}
            </label>
          )}
          {labelAction}
        </div>
      )}

      <div className="input-wrapper">
        <input
          id={id}
          type={inputType}
          className={`form-input ${isPassword ? 'form-input--password' : ''} ${
            error ? 'form-input--error' : ''
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <Icon name={showPassword ? 'eye' : 'eye-off'} size={18} />
          </button>
        )}
      </div>

      {error && <span className="form-error-text">{error}</span>}
      {!error && hint && <span className="form-hint-text">{hint}</span>}
    </div>
  );
};