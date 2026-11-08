import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { listSessions, logout } from '../../auth/api';
import { CenteredLayout } from '../../components/layout/CenteredLayout';
import { Button } from '../../components/ui/Button';

export function AccountPage({ session, onSignOut }) {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) return;
    let active = true;
    listSessions(session.accessToken).then((sessions) => {
      if (!active) return;
      if (sessions.some((item) => item.current)) setVerified(true);
      else onSignOut(null);
    }).catch((error) => {
      if (!active) return;
      if (error.status === 401) onSignOut(null);
      else setError(error.message);
    });
    return () => { active = false; };
  }, [session, onSignOut]);

  if (!session) return <Navigate to="/login" replace />;

  async function handleLogout() {
    if (pending) return;
    setPending(true);
    setError('');
    try {
      await logout(session.accessToken);
    } catch (error) {
      if (error.status !== 401) {
        setError(error.message);
        setPending(false);
        return;
      }
    }
    onSignOut(null);
    navigate('/', { replace: true });
  }

  return (
    <CenteredLayout backText="На главную" backTo="/" cardMaxWidth="510px">
      <div className="success-card-content">
        <h1 className="confirm-card-title">Личный кабинет</h1>
        {verified && <p className="success-card-description">{session.email}</p>}
        {!verified && !error && <p role="status">Проверяем сессию…</p>}
        {error && <p className="form-error-text" role="alert">{error}</p>}
        <Button variant="accent" disabled={pending} onClick={handleLogout}>Выйти</Button>
      </div>
    </CenteredLayout>
  );
}
