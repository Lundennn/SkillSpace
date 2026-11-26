import socialIcon from '../../assets/workspace/0cd11.png';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiteFooter } from '../../components/layout/SiteFooter';
import { WorkspaceHeader } from '../../components/workspace/WorkspaceHeader';
import { ProfileCard } from '../../components/workspace/ProfileCard';
import { CaseSection } from '../../components/workspace/CaseSection';
import { DesignIcon } from '../../components/workspace/DesignIcon';
import { demoProfile, events, professions, readProfile } from '../../components/workspace/demoData';
import '../../components/workspace/Workspace.css';

function ProfessionSection() {
  const [selected, setSelected] = useState(0);
  const profession = professions[selected];
  return (
    <section className="profession-card" id="professions" aria-labelledby="professions-title">
      <p className="workspace-eyebrow">Выбор траектории</p>
      <h2 id="professions-title">Примерь профессию</h2>
      <div className="profession-tabs" role="tablist" aria-label="Профессии">
        {professions.map((item, index) => (
          <button type="button" key={item.name} id={`profession-tab-${index}`} role="tab"
            className={selected === index ? 'is-selected' : ''} aria-selected={selected === index}
            aria-controls="profession-panel" tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)} onKeyDown={(event) => {
              const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
              if (!direction && event.key !== 'Home' && event.key !== 'End') return;
              event.preventDefault();
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? professions.length - 1
                : (index + direction + professions.length) % professions.length;
              setSelected(next);
              document.getElementById(`profession-tab-${next}`)?.focus();
            }}>
            <small>{String(index + 1).padStart(2, '0')}</small><strong>{item.name}</strong>
          </button>
        ))}
      </div>
      <div className="profession-details" id="profession-panel" role="tabpanel" aria-labelledby={`profession-tab-${selected}`}>
        <div>
          <p className="workspace-eyebrow">{profession.category}</p>
          <div className="profession-title"><h3>{profession.name}</h3>{selected === 0 && <span>92% match</span>}</div>
          <p className="profession-description">{profession.description}</p>
          <p className="workspace-field-label">Навыки после школы</p>
          <ul className="workspace-tags">{profession.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </div>
        <div className="profession-details__studies">
          <p className="workspace-field-label">Направления обучения</p>
          <ul>{profession.studies.map((study) => <li key={study}>{study}</li>)}</ul>
          <p className="workspace-field-label">Вузы в Томске</p>
          <ul>{profession.universities.map((university) => <li key={university}>{university}</li>)}</ul>
          <p className="workspace-field-label">ЕГЭ</p>
          <p>{profession.exams}</p>
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const [registered, setRegistered] = useState([]);
  return (
    <section className="workspace-section" id="events" aria-labelledby="events-title">
      <div className="workspace-section-heading">
        <div><p className="workspace-eyebrow">Рекомендации в городе</p><h2 id="events-title">События для твоей траектории</h2></div>
        <p>Университеты и компании Санкт-Петербурга приглашают школьников.</p>
      </div>
      <div className="event-list workspace-panel">
        {events.map((event, index) => {
          const active = registered.includes(event.id);
          return (
            <article className="event-row" key={event.id}>
              <div className={`event-date ${index === 1 ? 'event-date--lime' : ''}`}><strong>{event.day}</strong><small>{event.month}</small></div>
              <div className="event-info"><p>{event.organizer}</p><h3>{event.title}</h3>
                <span><DesignIcon name="location" />{event.location}</span>
              </div>
              <div className="event-benefit"><small>Польза</small><p>{event.benefit}</p></div>
              <button type="button" className="workspace-button workspace-button--outline" aria-pressed={active}
                onClick={() => setRegistered(active ? registered.filter((id) => id !== event.id) : [...registered, event.id])}>
                {active ? 'Вы записаны' : 'Записаться'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="portfolio-banner" id="portfolio" aria-labelledby="portfolio-title">
      <div>
        <p className="workspace-eyebrow">Моё портфолио</p>
        <h2 id="portfolio-title">Достижения, которые работают на поступление</h2>
        <p>Собирай сертификаты, кейсы и результаты олимпиад в одном месте.</p>
        <button className="workspace-button workspace-button--dark" type="button" aria-expanded={expanded}
          aria-controls="portfolio-details" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Скрыть портфолио' : 'Открыть портфолио'} <DesignIcon name="darkArrow" />
        </button>
      </div>
      <div className="portfolio-stats">
        {[
          ['Посещено', '03', 'мероприятия'],
          ['Получено', '02', 'сертификата'],
          ['К поступлению', '+15', 'баллов'],
        ].map(([title, number, label]) => (
          <div key={title}><small>{title}</small><strong>{number}</strong><span>{label}</span></div>
        ))}
      </div>
      {expanded && <div className="portfolio-details" id="portfolio-details">
        <h3>Мероприятия</h3>
        <ul>{events.map((event) => <li key={event.id}>{event.title}</li>)}</ul>
        <p>Сертификаты и баллы показаны на демонстрационных данных.</p>
      </div>}
    </section>
  );
}

export function DashboardPage({ profileOnly = false }) {
  const [profile] = useState(() => readProfile() ?? demoProfile);
  const { hash, pathname } = useLocation();
  const names = profile.fullName.trim().split(/\s+/);
  const firstName = names.length > 2 ? names[1] : names[0];

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    else window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <div className={`workspace-page ${profileOnly ? 'workspace-page--profile' : ''}`}>
      <WorkspaceHeader profile={profile} />
      <main className="workspace-container workspace-main">
        {!profileOnly && <section className="workspace-welcome">
          <p className="workspace-eyebrow">Личный кабинет</p>
          <h1>Привет, {firstName}<br /><em>Куда двигаемся дальше?</em></h1>
          <p>Твой профиль заполнен на 82%. Уточни интересы и реши новый кейс — рекомендации станут ещё точнее.</p>
          <div className="workspace-welcome__actions">
            <Link className="workspace-button workspace-button--lime" to="/dashboard#professions">Выбрать профессию <DesignIcon name="arrow" /></Link>
            <Link className="workspace-button workspace-button--outline" to="/dashboard#cases">Открыть кейсы</Link>
          </div>
        </section>}
        {profileOnly ? <ProfileCard profile={profile} expanded /> : (
          <div className="workspace-overview"><ProfileCard profile={profile} /><ProfessionSection /></div>
        )}
        <CaseSection />
        {!profileOnly && <><EventsSection /><PortfolioSection /></>}
      </main>
      <SiteFooter socialIcon={socialIcon} />
    </div>
  );
}
