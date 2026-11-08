import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { EmailConfirmPage } from './pages/EmailConfirm/EmailConfirmPage';
import { EmailConfirmationSuccessfulPage } from './pages/EmailConfirmationSuccessful/EmailConfirmationSuccessfulPage';
import { TwoFactorPage } from './pages/TwoFactorPage/TwoFactorPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Вход и регистрация */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Подтверждение почты и 2FA */}
        <Route path="/email-confirm" element={<EmailConfirmPage />} />
        <Route
          path="/email-confirmed"
          element={<EmailConfirmationSuccessfulPage />}
        />
        <Route path="/2fa" element={<TwoFactorPage />} />

        {/* Защитный редирект для несуществующих маршрутов */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;