import type { User } from '../types';

// Сервис для генерации данных графиков (не использует MobX)
export class ChartDataService {
  static generateRegistrationData(users: User[]) {
    const monthlyRegistrations: { [key: string]: number } = {};
    
    users.forEach(user => {
      const month = user.joinDate.substring(0, 7);
      monthlyRegistrations[month] = (monthlyRegistrations[month] || 0) + 1;
    });

    // Преобразуем в массив для графика
    const registrationData = Object.entries(monthlyRegistrations)
      .map(([month, count]) => ({
        name: month,
        пользователи: count
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return registrationData;
  }

  static generatePieChartData(users: User[]) {
    const roleDistribution = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    const pieChartData = Object.entries(roleDistribution).map(([name, value]) => ({
      name,
      value
    }));

    return pieChartData;
  }

  static generateStatusData(users: User[]) {
   const statusData = [
      { name: 'Активные', value: users.filter(u => u.status === 'active').length },
      { name: 'Неактивные', value: users.filter(u => u.status === 'inactive').length }
    ];

    return statusData;
  }

  static generateWeeklyActivity() {
    // Статические данные для демонстрации
     const weeklyActivity = [
      { name: 'Пн', посещения: 450, регистрации: 12 },
      { name: 'Вт', посещения: 520, регистрации: 8 },
      { name: 'Ср', посещения: 480, регистрации: 15 },
      { name: 'Чт', посещения: 510, регистрации: 10 },
      { name: 'Пт', посещения: 490, регистрации: 7 },
      { name: 'Сб', посещения: 380, регистрации: 5 },
      { name: 'Вс', посещения: 320, регистрации: 3 }
    ];

    return weeklyActivity;
  }

  static generateStats(users: User[]) {
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalUsers = users.length;
    const growth = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : '0';
    const activity = Math.floor(Math.random() * 20) + 80;

    return {
      totalUsers,
      activeUsers,
      growth: `+${growth}%`,
      activity: `${activity}%`
    };
  }

  // Получить все данные для графиков (обновленная версия)
  static getAllChartData(users: User[]) {
    const basicData = {
      registrationData: this.generateRegistrationData(users),
      pieChartData: this.generatePieChartData(users),
      statusData: this.generateStatusData(users),
      weeklyActivity: this.generateWeeklyActivity(),
      stats: this.generateStats(users)
    };

    const advancedData = this.generateAdvancedAnalytics(users);

    return {
      ...basicData,
      ...advancedData
    };
  }
 static generateAdvancedAnalytics(users: User[]) {
    const monthlyData = this.generateRegistrationData(users);
    
    // Добавляем дополнительные метрики к месячным данным
    const enhancedMonthlyData = monthlyData.map(item => ({
      ...item,
      активность: Math.floor(Math.random() * 100) + 50, // Демо данные
      удержание: Math.floor(Math.random() * 30) + 70   // Демо данные
    }));

    // Аналитика по времени суток
    const hourlyActivity = [
      { name: '00:00', активность: 20 },
      { name: '04:00', активность: 10 },
      { name: '08:00', активность: 60 },
      { name: '12:00', активность: 85 },
      { name: '16:00', активность: 75 },
      { name: '20:00', активность: 90 }
    ];

    return {
      enhancedMonthlyData,
      hourlyActivity,
      userEngagement: this.generateUserEngagementData(users)
    };
  }
// Генерация данных вовлеченности пользователей
  private static generateUserEngagementData(users: User[]) {
    return [
      { name: 'Высокая', value: Math.floor(users.length * 0.3) },
      { name: 'Средняя', value: Math.floor(users.length * 0.5) },
      { name: 'Низкая', value: Math.floor(users.length * 0.2) }
    ];
  }

}