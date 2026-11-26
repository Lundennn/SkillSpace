import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import gridMask from '../../assets/workspace/3a155.svg';
import gridIcon from '../../assets/workspace/d35ba.svg';
import './Workspace.css';

export function WorkspaceBrand({ onboarding = false }) {
  return (
    <Link className="workspace-brand" to={onboarding ? '/' : '/dashboard'}>
      <span className="workspace-brand__icon">
        {onboarding ? <img src={import.meta.env.BASE_URL + 'slillspaceIcon.svg'} alt="" />
          : <span className="workspace-brand__grid" style={{ maskImage: `url(${gridMask})` }}><img src={gridIcon} alt="" /></span>}
      </span>
      {onboarding ? <span className="workspace-brand__wordmark">Скилл<b>Спейс</b></span> : 'Траектория'}
    </Link>
  );
}

const links = [
  ['Обзор', '/dashboard'],
  ['Профессии', '/dashboard#professions'],
  ['Кейсы', '/dashboard#cases'],
  ['События', '/dashboard#events'],
  ['Портфолио', '/dashboard#portfolio'],
];

export function WorkspaceHeader({ profile }) {
  const [open, setOpen] = useState(false);
  const education = profile[profile.role];
  const level = profile.role === 'school' ? 'класс' : 'курс';
  const names = profile.fullName.trim().split(/\s+/);
  const initials = names.slice(0, 2).map((name) => name[0]).join('');
  return (
    <header className="workspace-header">
      <div className="workspace-container workspace-header__inner">
        <WorkspaceBrand />
        <button className="workspace-menu-button" type="button" onClick={() => setOpen(!open)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="workspace-nav">
          {open ? '×' : '☰'}
        </button>
        <nav className={`workspace-nav ${open ? 'workspace-nav--open' : ''}`} id="workspace-nav" aria-label="Разделы платформы">
          {links.map(([label, to]) => (
            <NavLink key={label} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive && !to.includes('#') ? 'is-active' : ''}>{label}</NavLink>
          ))}
        </nav>
        <Link className="workspace-user" to="/profile">
          <span>{names.length > 2 ? names[1] : names[0]}<small>{education.level} {level}</small></span>
          <span className="workspace-avatar">{initials}</span>
        </Link>
      </div>
    </header>
  );
}
