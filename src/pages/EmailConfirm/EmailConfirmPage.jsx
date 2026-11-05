import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { CodeInput } from '../../components/ui/CodeInput';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export const EmailConfirmPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const isCodeComplete = code.length === 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCodeComplete) return;
    navigate('/email-confirmed');
  };

  return (
    <CenteredLayout backText="К регистрации" backTo="/register" cardMaxWidth="510px">
      <div className="confirm-card-top">
        <div>
          <p className="confirm-card-badge">ПОДТВЕРЖДЕНИЕ ПОЧТЫ</p>
          <h1 className="confirm-card-title">Введите код из письма</h1>
          <p className="confirm-card-subtitle">
            Мы отправили шестизначный код на{' '}
            <span className="confirm-card-email">a•••••@example.ru</span>
          </p>
        </div>

        <div className="confirm-icon-box" aria-hidden="true">
          <Icon name="mail" size={22} />
        </div>
      </div>

      <form className="confirm-form" onSubmit={handleSubmit} noValidate>
        <CodeInput
          id="email-confirm-code"
          label="КОД ПОДТВЕРЖДЕНИЯ"
          value={code}
          onChange={setCode}
          hint="Только 6 цифр"
        />

        <Button type="submit" variant="accent" disabled={!isCodeComplete}>
          <span>Подтвердить почту</span>
          <Icon name="arrow-right" size={16} />
        </Button>
      </form>

      <footer className="confirm-card-footer">
        <span className="confirm-footer-question">Не получили письмо?</span>
        <button
          type="button"
          className="confirm-resend-btn"
          onClick={() => setCode('')}
        >
          Отправить повторно
        </button>
      </footer>
    </CenteredLayout>
  );
};