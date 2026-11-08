import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { verifyLogin, verifyRegistration } from '../../auth/api';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { CodeInput } from '../../components/ui/CodeInput';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export function EmailConfirmPage({ onSignIn }) {
  const { state: challenge } = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const isLogin = challenge?.purpose === 'login';
  const backTo = isLogin ? '/login' : '/register';

  if (!challenge?.challengeId) return <Navigate to={backTo} replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending || code.length !== 6) return;
    setError('');
    if (Date.parse(challenge.expiresAt) <= Date.now()) {
      setError('Срок действия кода истёк. Запросите новый код.');
      return;
    }

    setPending(true);
    try {
      if (isLogin) {
        const { accessToken } = await verifyLogin(challenge.challengeId, code);
        onSignIn({ accessToken, email: challenge.email });
        navigate('/account', { replace: true });
      } else {
        await verifyRegistration(challenge.challengeId, code);
        navigate('/email-confirmed', { replace: true, state: { confirmed: true } });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <CenteredLayout backText={isLogin ? 'Ко входу' : 'К регистрации'} backTo={backTo} cardMaxWidth="510px">
      <div className="confirm-card-top">
        <div>
          <p className="confirm-card-badge">{isLogin ? 'ПОДТВЕРЖДЕНИЕ ВХОДА' : 'ПОДТВЕРЖДЕНИЕ ПОЧТЫ'}</p>
          <h1 className="confirm-card-title">Введите код из письма</h1>
          <p className="confirm-card-subtitle">
            Мы отправили шестизначный код на{' '}
            <span className="confirm-card-email">{challenge.email}</span>
          </p>
        </div>
        <div className="confirm-icon-box" aria-hidden="true"><Icon name="mail" size={22} /></div>
      </div>

      <form className="confirm-form" onSubmit={handleSubmit}>
        <CodeInput
          id="email-confirm-code"
          label="КОД ПОДТВЕРЖДЕНИЯ"
          value={code}
          onChange={setCode}
          hint="Только 6 цифр"
        />
        {error && <p className="form-error-text" role="alert">{error}</p>}
        <Button type="submit" variant="accent" disabled={pending || code.length !== 6}>
          <span>{isLogin ? 'Подтвердить вход' : 'Подтвердить почту'}</span>
          <Icon name="arrow-right" size={16} />
        </Button>
      </form>

      <footer className="confirm-card-footer">
        <span className="confirm-footer-question">Не получили письмо?</span>
        <Link className="confirm-resend-btn" to={backTo} replace>Запросить новый код</Link>
      </footer>
    </CenteredLayout>
  );
}
