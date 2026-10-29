import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { LoginPage } from './pages/LoginPage/LoginPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Перенаправление с корта на страницу регистрации */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Страницы авторизации */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;