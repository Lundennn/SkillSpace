import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { CodeInput } from '../../components/ui/CodeInput';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import './TwoFactorPage.css';

const SECRET_KEY = 'TRAE-K7QP-M4VX-2B6D';

export const TwoFactorPage = () => {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const isCodeComplete = code.length === 6;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SECRET_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCodeComplete) return;
    navigate('/login');
  };

  return (
    <CenteredLayout
      backText="Ко входу"
      backTo="/login"
      pageTitle="Двухэтапная"
      pageTitleAccent="аутентификация."
      pageSubtitle="Добавьте аккаунт в приложение-аутентификатор, затем введите код для проверки."
      cardMaxWidth="640px"
    >
      {/* Блок с QR-кодом */}
      <div className="two-factor-qr-section">
        <div className="two-factor-qr-box" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="124" height="124" fill="#272b35">
            {/* Верхний левый квадрат */}
            <path d="M10 10h36v36H10V10zm6 6v24h24V16H16zm6 6h12v12H22V22z" />
            {/* Верхний правый квадрат */}
            <path d="M74 10h36v36H74V10zm6 6v24h24V16H80zm6 6h12v12H86V22z" />
            {/* Нижний левый квадрат */}
            <path d="M10 74h36v36H10V74zm6 6v24h24V80H16zm6 6h12v12H22V86z" />
            {/* Паттерн данных */}
            <rect x="54" y="10" width="6" height="12" />
            <rect x="54" y="28" width="12" height="6" />
            <rect x="48" y="40" width="6" height="6" />
            <rect x="10" y="54" width="12" height="6" />
            <rect x="28" y="52" width="12" height="12" rx="2" />
            <rect x="48" y="52" width="12" height="12" rx="2" />
            <rect x="68" y="52" width="12" height="12" rx="2" />
            <rect x="88" y="52" width="12" height="12" rx="2" />
            <rect x="104" y="54" width="6" height="12" />
            <rect x="54" y="74" width="6" height="24" />
            <rect x="66" y="74" width="18" height="18" rx="3" />
            <rect x="90" y="74" width="18" height="18" rx="3" />
            <rect x="66" y="98" width="6" height="12" />
            <rect x="78" y="104" width="12" height="6" />
            <rect x="96" y="98" width="14" height="12" />
          </svg>
        </div>
        <p className="two-factor-qr-caption">Отсканируйте QR-код</p>
      </div>

      {/* Разделитель */}
      <div className="form-divider" role="separator">
        <span>ИЛИ СКОПИРУЙТЕ КОД</span>
      </div>

      {/* Секретный ключ для копирования */}
      <div className="two-factor-secret-box">
        <code className="two-factor-secret-code">{SECRET_KEY}</code>
        <button
          type="button"
          className="two-factor-copy-btn"
          onClick={handleCopy}
        >
          <Icon name={copied ? 'check' : 'copy'} size={15} />
          <span>{copied ? 'Скопировано' : 'Копировать'}</span>
        </button>
      </div>

      {/* Форма ввода 6-значного кода */}
      <form className="two-factor-form" onSubmit={handleSubmit} noValidate>
        <div className="two-factor-form-header">
          <h2 className="two-factor-form-title">Введите код из приложения</h2>
          <p className="two-factor-form-subtitle">
            Код обновляется каждые 30 секунд.
          </p>
        </div>

        <CodeInput
          id="totp-code"
          label="ОДНОРАЗОВЫЙ КОД"
          value={code}
          onChange={setCode}
          hint="Только 6 цифр"
        />

        <Button type="submit" variant="accent" disabled={!isCodeComplete}>
          <span>Подтвердить и войти</span>
          <Icon name="arrow-right" size={16} />
        </Button>
      </form>

      <footer className="two-factor-footer">
        Не закрывайте эту страницу, пока не сохраните аккаунт в приложении.
      </footer>
    </CenteredLayout>
  );
};