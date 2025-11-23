import type { User } from "../types";

// Генерация случайных дат за последний год
const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};
const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1);
// Моковые пользователи (15 записей)
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Иван Иванов",
    email: "ivan.ivanov@company.com",
    role: "Администратор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 2,
    name: "Петр Петров",
    email: "petr.petrov@company.com",
    role: "Модератор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 3,
    name: "Мария Сидорова",
    email: "maria.sidorova@company.com",
    role: "Пользователь",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 4,
    name: "Анна Козлова",
    email: "anna.kozlova@company.com",
    role: "Пользователь",
    status: "inactive",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 5,
    name: "Сергей Васильев",
    email: "sergey.vasilev@company.com",
    role: "Модератор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 6,
    name: "Елена Новикова",
    email: "elena.novikova@company.com",
    role: "Пользователь",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 7,
    name: "Дмитрий Морозов",
    email: "dmitry.morozov@company.com",
    role: "Администратор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 8,
    name: "Ольга Васнецова",
    email: "olga.vasnecova@company.com",
    role: "Пользователь",
    status: "inactive",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 9,
    name: "Алексей Павлов",
    email: "alexey.pavlov@company.com",
    role: "Модератор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 10,
    name: "Наталья Орлова",
    email: "natalia.orlova@company.com",
    role: "Пользователь",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 11,
    name: "Михаил Лебедев",
    email: "mikhail.lebedeva@company.com",
    role: "Пользователь",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 12,
    name: "Виктория Семенова",
    email: "victoria.semenova@company.com",
    role: "Пользователь",
    status: "inactive",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 13,
    name: "Артем Кузнецов",
    email: "artem.kuznetsov@company.com",
    role: "Модератор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 14,
    name: "Юлия Попова",
    email: "yulia.popova@company.com",
    role: "Пользователь",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
  {
    id: 15,
    name: "Константин Соколов",
    email: "konstantin.sokolov@company.com",
    role: "Администратор",
    status: "active",
    joinDate: generateRandomDate(startDate, new Date()),
  },
];
// Данные для графиков на основе пользователей
export const generateChartDataFromUsers = (users: User[]) => {
  // Распределение по месяцам (регистрации)
  const monthlyRegistrations: { [key: string]: number } = {};
  users.forEach((user) => {
    const month = user.joinDate.substring(0, 7); // Год-месяц
    monthlyRegistrations[month] = (monthlyRegistrations[month] || 0) + 1;
  });
  // Преобразуем в массив для графика
  const registrationData = Object.entries(monthlyRegistrations)
    .map(([month, count]) => ({
      name: month,
      пользователи: count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  // Распределение по ролям
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  const pieChartData = Object.entries(roleDistribution).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  // Статусы пользователей
  const statusData = [
    {
      name: "Активные",
      value: users.filter((u) => u.status === "active").length,
    },
    {
      name: "Неактивные",
      value: users.filter((u) => u.status === "inactive").length,
    },
  ];
  // Активность по дням недели (моковые данные для демонстрации)
  const weeklyActivity = [
    { name: "Пн", посещения: 450, регистрации: 12 },
    { name: "Вт", посещения: 520, регистрации: 8 },
    { name: "Ср", посещения: 480, регистрации: 15 },
    { name: "Чт", посещения: 510, регистрации: 10 },
    { name: "Пт", посещения: 490, регистрации: 7 },
    { name: "Сб", посещения: 380, регистрации: 5 },
    { name: "Вс", посещения: 320, регистрации: 3 },
  ];
  return {
    registrationData,
    pieChartData,
    statusData,
    weeklyActivity,
  };
};
// Генерация статистики для карточек
export const generateStatsFromUsers = (users: User[]) => {
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalUsers = users.length;
  const growth = ((activeUsers / totalUsers) * 100).toFixed(1);
  const activity = Math.floor(Math.random() * 20) + 80; // 80-100%
  return {
    totalUsers,
    activeUsers,
    growth: `+${growth}%`,
    activity: `${activity}%`
  };
};