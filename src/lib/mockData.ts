export interface Task {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  solved?: boolean;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Логика последовательности',
    description: 'Найдите следующее число в последовательности',
    difficulty: 'easy',
    category: 'Математика',
    tags: ['последовательность', 'числа'],
    question: 'Какое число следующее в последовательности: 2, 4, 8, 16, ?',
    options: ['20', '24', '32', '64'],
    correctAnswer: 2,
    points: 10,
    solved: true,
  },
  {
    id: 2,
    title: 'Загадка про возраст',
    description: 'Решите задачу о возрасте персонажей',
    difficulty: 'medium',
    category: 'Логика',
    tags: ['возраст', 'рассуждения'],
    question: 'Если 5 лет назад Ане было вдвое больше лет, чем Борису, а сейчас им вместе 35 лет, сколько лет Борису?',
    options: ['10', '12', '15', '18'],
    correctAnswer: 1,
    points: 25,
    solved: true,
  },
  {
    id: 3,
    title: 'Логические ворота',
    description: 'Определите результат логической операции',
    difficulty: 'hard',
    category: 'Программирование',
    tags: ['алгоритмы', 'логика'],
    question: 'Если A=true, B=false, C=true, чему равно (A AND B) OR (NOT B AND C)?',
    options: ['true', 'false', 'undefined', 'null'],
    correctAnswer: 0,
    points: 50,
  },
  {
    id: 4,
    title: 'Переправа через реку',
    description: 'Классическая логическая головоломка',
    difficulty: 'medium',
    category: 'Головоломки',
    tags: ['классика', 'стратегия'],
    question: 'Фермеру нужно переправить волка, козу и капусту. В лодке помещается только один предмет. Сколько минимально рейсов нужно?',
    options: ['5', '7', '9', '11'],
    correctAnswer: 1,
    points: 30,
    solved: true,
  },
  {
    id: 5,
    title: 'Шахматная доска',
    description: 'Посчитайте количество квадратов',
    difficulty: 'easy',
    category: 'Геометрия',
    tags: ['визуальная логика', 'счёт'],
    question: 'Сколько всего квадратов разного размера на шахматной доске 8x8?',
    options: ['64', '204', '240', '296'],
    correctAnswer: 1,
    points: 15,
  },
  {
    id: 6,
    title: 'Взвешивание монет',
    description: 'Найдите фальшивую монету',
    difficulty: 'hard',
    category: 'Головоломки',
    tags: ['взвешивание', 'оптимизация'],
    question: 'Есть 12 монет, одна фальшивая (легче). Сколько минимум взвешиваний на весах нужно?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    points: 50,
  },
];

export const getTasks = (): Task[] => mockTasks;
