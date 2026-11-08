import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SiteLayout.css';

const sections = [
  ['Главная', 'home'],
  ['Продукты', 'products'],
  ['Документы', 'contacts'],
  ['Цены', 'pricing'],
];

export function SiteHeader({ onSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function selectSection(id) {
    setMenuOpen(false);
    onSection(id);
  }

  return (
    <header className="site-header">
      <div className="site-width site-header__inner">
        <Link className="site-brand" to="/" aria-label="СкиллСпейс — главная">
          <img src={import.meta.env.BASE_URL + 'slillspaceIcon.svg'} alt="" />
          <span>Скилл<b>Спейс</b></span>
        </Link>
        <nav id="site-menu" className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Основная навигация">
          {sections.map(([label, id]) => (
            <button key={id} type="button" onClick={() => selectSection(id)}>{label}</button>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link className="site-pill site-pill--outline site-header__desktop" to="/login">Войти</Link>
          <Link className="site-pill site-header__desktop" to="/register">Регистрация</Link>
          <Link className="site-header__mobile" to="/login">Личный кабинет ♙</Link>
          <button
            className="site-header__mobile site-menu-toggle"
            type="button"
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen(!menuOpen)}
          >{menuOpen ? '×' : '☰'}</button>
        </div>
      </div>
    </header>
  );
}
