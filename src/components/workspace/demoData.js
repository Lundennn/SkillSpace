export const demoProfile = {
  fullName: 'Александр Крылов',
  age: '16',
  role: 'school',
  school: { institution: 'Академическая гимназия № 56', level: '10', year: '2027', specialty: '' },
  student: { institution: '', level: '', year: '', specialty: '' },
};

export const subjects = ['Математика', 'Русский язык', 'Информатика'];
export const interests = ['Python', 'Figma', 'ИИ'];

export const professions = [
  {
    name: 'Разработчик ИИ', category: 'IT · Искусственный интеллект',
    description: 'Создаёт и обучает интеллектуальные системы: от рекомендательных алгоритмов до компьютерного зрения и языковых моделей.',
    skills: ['Python', 'Анализ данных', 'Алгоритмы', 'Командная работа'],
    studies: ['Прикладная математика', 'Информатика и вычислительная техника', 'Искусственный интеллект'],
    universities: ['ТУСУР', 'ТГУ', 'ТПУ'], exams: 'Математика · Русский язык · Информатика',
  },
  {
    name: 'Биоинженер', category: 'Наука · Биотехнологии',
    description: 'Соединяет биологию и инженерные подходы, чтобы разрабатывать технологии для медицины и окружающей среды.',
    skills: ['Биология', 'Исследования', 'Анализ данных'],
    studies: ['Биотехнология', 'Биоинженерия'], universities: ['ТГУ', 'ТПУ'],
    exams: 'Биология · Химия · Русский язык',
  },
  {
    name: 'Архитектор', category: 'Проектирование · Архитектура',
    description: 'Проектирует здания и пространства, объединяя удобство, эстетику и инженерные решения.',
    skills: ['Проектирование', 'Рисунок', 'Пространственное мышление'],
    studies: ['Архитектура', 'Дизайн архитектурной среды'], universities: ['ТГАСУ'],
    exams: 'Математика · Русский язык · Творческое испытание',
  },
  {
    name: 'Продакт-менеджер', category: 'Продукт · Управление',
    description: 'Изучает потребности людей, формирует концепцию продукта и помогает команде развивать его.',
    skills: ['Исследования', 'Аналитика', 'Командная работа'],
    studies: ['Менеджмент', 'Бизнес-информатика'], universities: ['ТГУ', 'ТУСУР'],
    exams: 'Математика · Русский язык · Обществознание',
  },
];

export const cases = [
  { id: 'city', category: 'IT · 90 мин', title: 'Умный маршрут по городу', description: 'Спроектируйте алгоритм, который подберёт школьнику образовательные события.', tags: ['Логика', 'Python'], difficulty: 'Средний' },
  { id: 'internship', category: 'Продукт · 60 мин', title: 'Сервис школьных стажировок', description: 'Изучите аудиторию и соберите концепцию сервиса для первой практики.', tags: ['Исследования', 'Презентация'], difficulty: 'Начальный' },
  { id: 'water', category: 'Наука · 75 мин', title: 'Чистая вода для района', description: 'Предложите решение экологической задачи на основе открытых данных.', tags: ['Анализ', 'Системность'], difficulty: 'Средний' },
];

export const events = [
  { id: 'open-day', day: '18', month: 'АПР', organizer: 'ТУСУР', title: 'День открытых дверей: ИИ и робототехника', location: 'Томск · 12:00', benefit: '+5 баллов к портфолио' },
  { id: 'ml', day: '23', month: 'АПР', organizer: 'Яндекс Образование', title: 'Как устроена работа ML-инженера', location: 'Онлайн · 18:30', benefit: 'Сертификат участника' },
  { id: 'olympiad', day: '04', month: 'МАЙ', organizer: 'ТУСУР', title: 'Олимпиада по анализу данных', location: 'Ленина, 46 · 10:00', benefit: 'До +10 баллов при поступлении' },
];

export function readProfile() {
  try {
    const saved = JSON.parse(sessionStorage.getItem('skillspace.profile'));
    if (!saved || typeof saved !== 'object') return null;
    const validRole = saved.role === 'school' || saved.role === 'student';
    if (!validRole || typeof saved.fullName !== 'string' || typeof saved.age !== 'string') return null;
    const education = {};
    for (const role of ['school', 'student']) {
      education[role] = {};
      for (const field of ['institution', 'level', 'year', 'specialty']) {
        if (typeof saved[role]?.[field] !== 'string') return null;
        education[role][field] = saved[role][field];
      }
    }
    return { fullName: saved.fullName, age: saved.age, role: saved.role, ...education };
  } catch {
    return null;
  }
}
