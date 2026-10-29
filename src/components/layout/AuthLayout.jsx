import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import './AuthLayout.css';

export const AuthLayout = ({
                             promoBadge,
                             promoTitle,
                             promoAccent,
                             promoDescription,
                             formBadge,
                             formTitle,
                             formSubtitle,
                             footerText,
                             footerLinkText,
                             footerLinkTo,
                             children,
                           }) => {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="brand-logo" aria-label="СкиллСпейс — На главную">
          <span className="brand-logo__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 14.2L5 13.4v3.8c0 2.1 3.1 3.8 7 3.8s7-1.7 7-3.8v-3.8l-7 3.8z" />
            </svg>
          </span>
          <span className="brand-logo__text">
            <span className="brand-logo__skill">Скилл</span>
            <span className="brand-logo__space">Спейс</span>
          </span>
        </Link>

        <Link to="/" className="back-button">
          <Icon name="arrow-left" size={16} />
          <span>Вернуться на главную</span>
        </Link>
      </header>

      <main className="auth-main">
        {/* Левая промо-секция */}
        <section className="auth-promo" aria-labelledby="promo-heading">
          <div className="auth-promo__content">
            <p className="section-badge section-badge--primary">{promoBadge}</p>
            <h1 id="promo-heading" className="auth-promo__title">
              {promoTitle} <span className="text-accent">{promoAccent}</span>
            </h1>
            <p className="auth-promo__description">{promoDescription}</p>
          </div>

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

        {/* Правая секция с формой */}
        <section className="auth-form-section" aria-labelledby="form-heading">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <p className="section-badge section-badge--muted">{formBadge}</p>
              <h2 id="form-heading" className="auth-form-title">
                {formTitle}
              </h2>
              <p className="auth-form-subtitle">{formSubtitle}</p>
            </div>

            {children}

            <footer className="auth-form-footer">
              <p className="auth-switch-text">
                {footerText}{' '}
                <Link to={footerLinkTo} className="auth-switch-link">
                  {footerLinkText}
                </Link>
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};