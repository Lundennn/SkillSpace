import { Link } from 'react-router-dom';
import { DesignIcon } from './DesignIcon';
import { interests, subjects } from './demoData';

export function ProfileCard({ profile, expanded = false }) {
  const education = profile[profile.role];
  const school = profile.role === 'school';
  return (
    <section className={`profile-card workspace-panel ${expanded ? 'profile-card--expanded' : ''}`} aria-labelledby="profile-title">
      <div className="profile-card__data">
        <div className="profile-card__heading">
          <div>
            <p className="workspace-eyebrow workspace-eyebrow--muted">Мои данные</p>
            <h2 id="profile-title">Профиль {school ? 'ученика' : 'студента'}</h2>
          </div>
          <Link className="workspace-edit" to="/onboarding"><DesignIcon name="edit" />Редактировать</Link>
        </div>
        <dl className="profile-fields">
          <div className="profile-fields__wide"><dt>Фамилия и имя</dt><dd>{profile.fullName}</dd></div>
          <div><dt>{school ? 'Класс' : 'Курс'}</dt><dd>{education.level} {school ? 'класс' : 'курс'}</dd></div>
          <div><dt>{school ? 'Школа' : 'Учебное заведение'}</dt><dd>{education.institution}</dd></div>
        </dl>
        <p className="workspace-field-label">Предметы ЕГЭ</p>
        <ul className="workspace-tags workspace-tags--blue">
          {subjects.map((subject) => <li key={subject}>✓ {subject}</li>)}
        </ul>
        <p className="workspace-field-label">Интересы</p>
        <ul className="workspace-tags workspace-tags--lime">
          {interests.map((interest) => <li key={interest}>✓ {interest}</li>)}
        </ul>
      </div>
      {expanded && <div className="profile-card__placeholder" role="img" aria-label="Место для изображения профиля" />}
    </section>
  );
}
