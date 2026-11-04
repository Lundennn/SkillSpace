import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import './CenteredLayout.css';

export const CenteredLayout = ({
                                 backText = 'К регистрации',
                                 backTo = '/register',
                                 pageTitle,
                                 pageTitleAccent,
                                 pageSubtitle,
                                 cardMaxWidth = '510px',
                                 children,
                               }) => {
  return (
    <div className="centered-page">
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

        <Link to={backTo} className="back-button">
          <Icon name="arrow-left" size={16} />
          <span>{backText}</span>
        </Link>
      </header>

      <main className="centered-main">
        <div
          className="centered-container"
          style={{ maxWidth: cardMaxWidth }}
        >
          {(pageTitle || pageSubtitle) && (
            <div className="centered-page-intro">
              {pageTitle && (
                <h1 className="centered-page-title">
                  {pageTitle}{' '}
                  {pageTitleAccent && (
                    <span className="centered-page-title-accent">
                      {pageTitleAccent}
                    </span>
                  )}
                </h1>
              )}
              {pageSubtitle && (
                <p className="centered-page-subtitle">{pageSubtitle}</p>
              )}
            </div>
          )}

          <section className="centered-card">{children}</section>
        </div>
      </main>
    </div>
  );
};