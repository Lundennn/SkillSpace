import { useState } from 'react';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    console.log('Register:', { email, password, acceptedTerms });
  };

  return (
    <AuthLayout
      promoBadge="НАЧНИТЕ КАРЬЕРНЫЙ МАРШРУТ"
      promoTitle="Профессия ближе,"
      promoAccent="чем кажется."
      promoDescription="Создайте профиль, выберите профессию и получите персональный план развития компетенций."
      formBadge="НОВЫЙ ПРОФИЛЬ"
      formTitle="Регистрация"
      formSubtitle="Заполните данные — это займёт меньше минуты."
      footerText="Уже есть аккаунт?"
      footerLinkText="Войти"
      footerLinkTo="/login"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
          placeholder="Не менее 8 символов"
          minLength={8}
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

        <Button type="submit" variant="accent">
          <span>Создать аккаунт</span>
          <Icon name="arrow-right" size={16} />
        </Button>

        <div className="form-divider" role="separator">
          <span>ИЛИ</span>
        </div>

        <Button type="button" variant="social">
          <span className="google-icon" aria-hidden="true">G</span>
          <span>Продолжить с Google</span>
        </Button>
      </form>
    </AuthLayout>
  );
};