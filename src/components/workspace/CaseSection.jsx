import { useState } from 'react';
import { cases } from './demoData';
import { DesignIcon } from './DesignIcon';

export function CaseSection() {
  const [selected, setSelected] = useState(['internship']);
  const [notice, setNotice] = useState('');
  function toggleCase(item) {
    const exists = selected.includes(item.id);
    setSelected(exists ? selected.filter((id) => id !== item.id) : [...selected, item.id]);
    setNotice(exists ? `«${item.title}» удалён из моих кейсов.` : `«${item.title}» добавлен в мои кейсы.`);
  }
  return (
    <section id="cases" className="workspace-section" aria-labelledby="cases-title">
      <div className="workspace-section-heading">
        <div><p className="workspace-eyebrow">Практика</p><h2 id="cases-title">Кейсы, чтобы попробовать себя</h2></div>
        <p>Решения пополнят портфолио и покажут, какие навыки уже сильны.</p>
      </div>
      <div className="case-grid">
        {cases.map((item, index) => {
          const active = selected.includes(item.id);
          return (
            <article className="case-card workspace-panel" key={item.id}>
              <div className="case-card__meta"><span>{item.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul className="workspace-tags">{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <div className="case-card__bottom">
                <span>{item.difficulty}</span>
                <button type="button" className={`workspace-button ${active ? 'workspace-button--lime' : ''}`}
                  aria-pressed={active} onClick={() => toggleCase(item)}>
                  <DesignIcon name={active ? 'check' : 'arrow'} />{active ? 'В моих кейсах' : 'Начать'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="workspace-status" role="status">{notice}</p>
    </section>
  );
}
