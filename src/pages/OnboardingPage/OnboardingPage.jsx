import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { WorkspaceBrand } from '../../components/workspace/WorkspaceHeader';
import { DesignIcon } from '../../components/workspace/DesignIcon';
import { readProfile } from '../../components/workspace/demoData';
import './OnboardingPage.css';

const steps = [
  ['Основные данные', 'ФИО и возраст'],
  ['Учёба', 'Статус и учебное заведение'],
  ['Интересы', 'Предметы и направления'],
];
const emptyEducation = { institution: '', level: '', year: '', specialty: '' };

function EducationSelect({ label, value, onChange, options, id }) {
  return (
    <label className="onboarding-select" htmlFor={id}>
      <span>{label}</span>
      <select aria-label={label} id={id} value={value} onChange={onChange} required>
        <option value="">Выберите</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [profile, setProfile] = useState(() => readProfile() ?? {
    fullName: '', age: '', role: 'school',
    school: { ...emptyEducation }, student: { ...emptyEducation },
  });
  const [storageError, setStorageError] = useState('');
  const step = params.get('step') === 'education' ? 2 : 1;
  const school = profile.role === 'school';
  const education = profile[profile.role];
  const validBasics = profile.fullName.trim().split(/\s+/).length >= 2 &&
    Number.isInteger(Number(profile.age)) && Number(profile.age) >= 14 && Number(profile.age) <= 120;
  const validEducation = education.institution.trim() && education.level && education.year;
  const year = new Date().getFullYear();

  function updateEducation(field, value) {
    setProfile({ ...profile, [profile.role]: { ...education, [field]: value } });
  }

  function submit(event) {
    event.preventDefault();
    if (step === 1) {
      if (validBasics) setParams({ step: 'education' });
      return;
    }
    if (!validBasics) {
      setParams({});
      return;
    }
    if (!validEducation) return;
    try {
      sessionStorage.setItem('skillspace.profile', JSON.stringify(profile));
      navigate('/dashboard');
    } catch {
      setStorageError('Не удалось сохранить данные в этом браузере. Разрешите локальное хранение и повторите.');
    }
  }

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <WorkspaceBrand onboarding />
        <div className="onboarding-progress">
          <ol aria-label="Шаги настройки">
            {steps.map(([title], index) => (
              <li key={title} className={index + 1 === step ? 'is-current' : index + 1 < step ? 'is-complete' : ''}
                aria-current={index + 1 === step ? 'step' : undefined}>
                {index + 1 < step ? <DesignIcon name="check" /> : String(index + 1).padStart(2, '0')}
              </li>
            ))}
          </ol>
          <span>Шаг {step} из 3</span>
        </div>
      </header>
      <main className="onboarding-main">
        <aside className="onboarding-sidebar">
          <div>
            <p className="workspace-eyebrow">Обязательная настройка</p>
            <h1>Расскажите<br />{' '}<em>немного о себе.</em></h1>
            <p className="onboarding-description">Ответы помогут подобрать профессии, вузы, кейсы и мероприятия именно под вашу ситуацию.</p>
          </div>
          <ol className="onboarding-steps">
            {steps.map(([title, description], index) => (
              <li key={title} className={index + 1 === step ? 'is-current' : ''}>
                <span className={index + 1 <= step ? 'is-complete' : ''}>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{title}</strong><small>{description}</small></div>
              </li>
            ))}
          </ol>
        </aside>
        <section className="onboarding-section" aria-labelledby="onboarding-title">
          <form className="onboarding-form" onSubmit={submit}>
            <p className="workspace-eyebrow">{step === 1 ? 'Знакомство' : 'Текущий статус'}</p>
            <h2 id="onboarding-title">{step === 1 ? 'Как к вам обращаться?' : 'Где вы учитесь?'}</h2>
            <p className="onboarding-description">{step === 1
              ? 'Укажите настоящие данные — они будут использоваться в профиле и сертификатах.'
              : 'Выберите вариант — набор вопросов изменится автоматически.'}</p>
            {step === 1 ? (
              <div className="onboarding-fields">
                <Input id="full-name" label="Фамилия, имя и отчество" placeholder="Например, Александр Сергеевич Крылов"
                  value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })}
                  autoComplete="name" maxLength={200} required />
                <div className="onboarding-age">
                  <Input id="age" label="Возраст" type="number" min={14} max={120} step={1} placeholder="16"
                    value={profile.age} onChange={(event) => setProfile({ ...profile, age: event.target.value })} required
                    aria-describedby="age-hint" />
                  <p id="age-hint">Минимальный возраст для самостоятельного использования сервиса — 14 лет.</p>
                </div>
              </div>
            ) : (
              <div className="onboarding-fields">
                <div className="onboarding-roles" role="group" aria-label="Статус учёбы">
                  {[
                    ['school', 'Я школьник', 'Учусь в 8–11 классе и выбираю, куда поступать', 'school', 'schoolInactive'],
                    ['student', 'Я студент', 'Уже учусь в колледже или университете', 'studentActive', 'student'],
                  ].map(([role, title, description, activeIcon, inactiveIcon]) => (
                    <button type="button" key={role} aria-pressed={profile.role === role}
                      className={`onboarding-role ${profile.role === role ? 'is-selected' : ''}`}
                      onClick={() => setProfile({ ...profile, role })}>
                      <span className="onboarding-role__icon"><DesignIcon name={profile.role === role ? activeIcon : inactiveIcon} /></span>
                      <span><strong>{title}</strong><small>{description}</small></span>
                    </button>
                  ))}
                </div>
                <div className="onboarding-education">
                  <Input id="institution" label={school ? 'Школа' : 'Учебное заведение'}
                    placeholder={school ? 'Название или номер школы' : 'Колледж или университет'}
                    value={education.institution} onChange={(event) => updateEducation('institution', event.target.value)} required maxLength={200} />
                  <div className="onboarding-education__row">
                    <EducationSelect id="education-level" label={school ? 'Класс' : 'Курс'} value={education.level}
                      onChange={(event) => updateEducation('level', event.target.value)}
                      options={school ? ['8', '9', '10', '11'] : ['1', '2', '3', '4', '5', '6']} />
                    <EducationSelect id="graduation-year" label="Год окончания" value={education.year}
                      onChange={(event) => updateEducation('year', event.target.value)}
                      options={Array.from({ length: 9 }, (_, index) => String(year + index))} />
                  </div>
                  <Input id="specialty" label={school ? 'Профиль класса — необязательно' : 'Специальность — необязательно'}
                    placeholder={school ? 'Например, физико-математический' : 'Например, программная инженерия'}
                    value={education.specialty} onChange={(event) => updateEducation('specialty', event.target.value)} maxLength={200} />
                </div>
              </div>
            )}
            {storageError && <p role="alert" className="form-error-text">{storageError}</p>}
            <div className={`onboarding-controls ${step === 1 ? 'onboarding-controls--first' : ''}`}>
              {step === 2 && <button type="button" className="onboarding-back" onClick={() => setParams({})}><DesignIcon name="back" />Назад</button>}
              <Button type="submit" fullWidth={false} disabled={step === 1 ? !validBasics : !validEducation}>
                Продолжить <DesignIcon name="darkArrow" />
              </Button>
            </div>
            <Link className="onboarding-preview" to="/dashboard">Посмотреть кабинет</Link>
          </form>
        </section>
      </main>
    </div>
  );
}
