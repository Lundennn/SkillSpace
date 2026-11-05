import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { CodeInput } from '../../components/ui/CodeInput';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import './TwoFactorPage.css';

import qrCodeImg from '../../assets/qr-code.svg';

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
      pageTitleAccent="аутентификацияы"
      pageSubtitle="Добавьте аккаунт в приложение-аутентификатор, затем введите код для проверки."
      cardMaxWidth="640px"
    >
      {/* Блок с QR-кодом */}
      <div className="two-factor-qr-section">
        <div className="two-factor-qr-box" aria-hidden="true">
          {/* Убираем длинный тег <svg> и вставляем картинку */}
          <img
            src={qrCodeImg}
            alt="QR-код для настройки 2FA"
            width="124"
            height="124"
            style={{ display: 'block' }}
          />
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