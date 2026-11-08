import { startLogin } from '../../auth/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError('');
    try {
      const address = email.trim();
      const challenge = await startLogin(address, password);
      navigate('/email-confirm', {
        state: { ...challenge, email: address, purpose: 'login' },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout
      promoBadge="ПРОДОЛЖИТЕ СВОЙ ПУТЬ"
      promoTitle="С возвращением"
      promoAccent="к вашей цели"
      promoDescription="Ваш маршрут, прогресс и рекомендации сохранены. Войдите, чтобы продолжить с текущего этапа."
      formBadge="ЛИЧНЫЙ КАБИНЕТ"
      formTitle="Вход в аккаунт"
      formSubtitle="Введите данные, указанные при регистрации."
      footerText="Ещё нет аккаунта?"
      footerLinkText="Зарегистрироваться"
      footerLinkTo="/register"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          id="login-email"
          label="ЭЛЕКТРОННАЯ ПОЧТА"
          type="email"
          placeholder="name@example.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          id="login-password"
          label="ПАРОЛЬ"
          type="password"
          placeholder="Не менее 12 символов"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && <p className="form-error-text" role="alert">{error}</p>}
        <Button type="submit" variant="accent" disabled={pending}>
          <span>Войти в аккаунт</span>
          <Icon name="arrow-right" size={16} />
        </Button>

        <div className="form-divider" role="separator">
          <span>ИЛИ</span>
        </div>

        <Button type="button" variant="social" disabled>
          <span className="google-icon" aria-hidden="true">G</span>
          <span>Продолжить с Google</span>
        </Button>
      </form>
    </AuthLayout>
  );
};