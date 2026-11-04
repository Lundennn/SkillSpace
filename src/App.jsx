import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { EmailConfirmStartPage } from './pages/EmailConfirmStart/EmailConfirmStartPage';
import { EmailConfirmEndPage } from './pages/EmailConfirmEnd/EmailConfirmEndPage';
import { EmailConfirmationSuccessfulPage } from './pages/EmailConfirmationSuccessful/EmailConfirmationSuccessfulPage';
import { TwoFactorPage } from './pages/TwoFactorPage/TwoFactorPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Вход и регистрация */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Подтверждение почты и 2FA */}
        <Route path="/email-confirm-start" element={<EmailConfirmStartPage />} />
        <Route path="/email-confirm-end" element={<EmailConfirmEndPage />} />
        <Route
          path="/email-confirmed"
          element={<EmailConfirmationSuccessfulPage />}
        />
        <Route path="/2fa" element={<TwoFactorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;