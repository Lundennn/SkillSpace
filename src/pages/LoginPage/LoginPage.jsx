import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password, rememberMe });
  };

  return (
    <AuthLayout
      promoBadge="ПРОДОЛЖИТЕ СВОЙ ПУТЬ"
      promoTitle="С возвращением"
      promoAccent="к вашей цели."
      promoDescription="Ваш маршрут, прогресс и рекомендации сохранены. Войдите, чтобы продолжить с текущего этапа."
      formBadge="ЛИЧНЫЙ КАБИНЕТ"
      formTitle="Вход в аккаунт"
      formSubtitle="Введите данные, указанные при регистрации."
      footerText="Ещё нет аккаунта?"
      footerLinkText="Зарегистрироваться"
      footerLinkTo="/register"
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
          labelAction={
            <Link to="/forgot-password" className="auth-switch-link" style={{ fontSize: '12px' }}>
              Забыли пароль?
            </Link>
          }
          type="password"
          placeholder="Не менее 8 символов"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <Checkbox
          label="Запомнить меня на этом устройстве"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />

        <Button type="submit" variant="accent">
          <span>Войти в аккаунт</span>
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