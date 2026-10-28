import { useState } from 'react';
import './AuthPage.css';

export const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    console.log({ email, password, acceptedTerms });
  };

  return (
    <div className="auth-page">
      {/* Шапка сайта */}
      <header className="auth-header">
        <a href="/" className="brand-logo" aria-label="СкиллСпейс — На главную">
          <span className="brand-logo__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 14.2L5 13.4v3.8c0 2.1 3.1 3.8 7 3.8s7-1.7 7-3.8v-3.8l-7 3.8z" />
            </svg>
          </span>
          <span className="brand-logo__text">
            <span className="brand-logo__skill">Скилл</span>
            <span className="brand-logo__space">Спейс</span>
          </span>
        </a>

        <a href="/" className="back-button">
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 12L6 8l4-4" />
            <path d="M6 8h7" />
          </svg>
          <span>Вернуться на главную</span>
        </a>
      </header>

      {/* Основной контент из двух секций */}
      <main className="auth-main">
        {/* Левая промо-секция */}
        <section className="auth-promo" aria-labelledby="promo-heading">
          <div className="auth-promo__content">
            <p className="section-badge section-badge--primary">
              НАЧНИТЕ КАРЬЕРНЫЙ МАРШРУТ
            </p>
            <h1 id="promo-heading" className="auth-promo__title">
              Профессия ближе,{' '}
              <span className="text-accent">чем кажется.</span>
            </h1>
            <p className="auth-promo__description">
              Создайте профиль, выберите профессию и получите персональный план
              развития компетенций.
            </p>
          </div>

          {/* Декоративный график */}
          <div className="auth-promo__chart" aria-hidden="true">
            <svg
              viewBox="0 0 600 320"
              fill="none"
              preserveAspectRatio="none"
              className="chart-svg"
            >
              <polyline
                points="-10,315 85,225 140,275 245,165 300,215 405,105 460,155 615,5"
                stroke="var(--color-primary)"
                strokeWidth="22"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
              <polyline
                points="150,350 250,250 300,285 415,175 465,215 615,75"
                stroke="var(--color-accent)"
                strokeWidth="20"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
        </section>

        {/* Правая секция с формой регистрации */}
        <section className="auth-form-section" aria-labelledby="register-heading">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <p className="section-badge section-badge--muted">НОВЫЙ ПРОФИЛЬ</p>
              <h2 id="register-heading" className="auth-form-title">
                Регистрация
              </h2>
              <p className="auth-form-subtitle">
                Заполните данные — это займёт меньше минуты.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Поле Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  ЭЛЕКТРОННАЯ ПОЧТА
                </label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="name@example.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Поле Пароль */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  ПАРОЛЬ
                </label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input form-input--password"
                    placeholder="Не менее 8 символов"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? 'Скрыть пароль' : 'Показать пароль'
                    }
                  >
                    {showPassword ? (
                      /* Иконка eye */
                      <svg
                        viewBox="0 0 16 16"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" />
                        <circle cx="8" cy="8" r="2" />
                      </svg>
                    ) : (
                      /* Иконка eye-off */
                      <svg
                        viewBox="0 0 16 16"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 2l12 12" />
                        <path d="M6.7 6.7a2 2 0 002.6 2.6" />
                        <path d="M4.2 4.3C2.6 5.4 1.5 8 1.5 8s2.5 4.5 6.5 4.5c1.5 0 2.8-.5 3.9-1.2" />
                        <path d="M10.5 4.1C9.7 3.7 8.9 3.5 8 3.5c-1.1 0-2.1.3-3 .8" />
                        <path d="M13.2 6.2C14.1 7.2 14.5 8 14.5 8s-.8 1.5-2.2 2.8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Чекбокс согласия */}
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  required
                />
                <span className="checkbox-custom" aria-hidden="true" />
                <span className="checkbox-label">
                  Я принимаю условия использования и политику обработки данных
                </span>
              </label>

              {/* Кнопка отправки (CTA) */}
              <button type="submit" className="btn btn--accent">
                <span>Создать аккаунт</span>
                <svg
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10" />
                  <path d="M9 4l4 4-4 4" />
                </svg>
              </button>

              {/* Разделитель */}
              <div className="form-divider" role="separator">
                <span>ИЛИ</span>
              </div>

              {/* Вход через Google */}
              <button type="button" className="btn btn--social">
                <span className="google-icon" aria-hidden="true">
                  G
                </span>
                <span>Продолжить с Google</span>
              </button>
            </form>

            {/* Нижняя часть блока формы */}
            <footer className="auth-form-footer">
              <p className="auth-switch-text">
                Уже есть аккаунт?{' '}
                <a href="/login" className="auth-switch-link">
                  Войти
                </a>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthPage;