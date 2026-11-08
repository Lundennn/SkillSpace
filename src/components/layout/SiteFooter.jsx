import './SiteLayout.css';

const team = [
  ['Анна', 'Дизайнер'],
  ['Егор', 'Разработчик'],
  ['Роман', 'Разработчик'],
  ['Вячеслав', 'Разработчик'],
];

export function SiteFooter() {
  return (
    <footer className="site-width site-footer" id="contacts">
      <div className="site-footer__contact">
        <h2>По всем вопросам:</h2>
        <a href="mailto:annkotlik06@gmail.com">annkotlik06@gmail.com</a>
      </div>
      <div className="site-footer__team">
        <h2>Наши соцсети</h2>
        <ul>
          {team.map(([name, role]) => (
            <li key={name}><span aria-hidden="true">ᴠκ</span>{name}<br />{role}</li>
          ))}
        </ul>
      </div>
      <small>Траектория — персональный карьерный навигатор</small>
    </footer>
  );
}
