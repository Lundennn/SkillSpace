import { startRegistration } from '../../auth/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pending || !acceptedTerms) return;
    setPending(true);
    setError('');
    try {
      const address = email.trim();
      const challenge = await startRegistration(address, password);
      navigate('/email-confirm', {
        state: { ...challenge, email: address, purpose: 'registration' },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthLayout
      promoBadge="НАЧНИТЕ КАРЬЕРНЫЙ МАРШРУТ"
      promoTitle="Профессия ближе,"
      promoAccent="чем кажется"
      promoDescription="Создайте профиль, выберите профессию и получите персональный план развития компетенций."
      formBadge="НОВЫЙ ПРОФИЛЬ"
      formTitle="Регистрация"
      formSubtitle="Заполните данные — это займёт меньше минуты."
      footerText="Уже есть аккаунт?"
      footerLinkText="Войти"
      footerLinkTo="/login"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          id="register-email"
          label="ЭЛЕКТРОННАЯ ПОЧТА"
          type="email"
          placeholder="name@example.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          id="register-password"
          label="ПАРОЛЬ"
          type="password"
          placeholder="Не менее 12 символов"
          minLength={12}
          maxLength={128}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <Checkbox
          label="Я принимаю условия использования и политику обработки данных"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          required
        />

        {error && <p className="form-error-text" role="alert">{error}</p>}
        <Button type="submit" variant="accent" disabled={pending}>
          <span>Создать аккаунт</span>
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