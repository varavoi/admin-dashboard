import { makeAutoObservable } from "mobx";
import type { User } from "../types";
import {
  mockUsers,
  generateChartDataFromUsers,
  generateStatsFromUsers,
} from "../mocks/data";
class UserStore {
  users: User[] = [];
  isLoading: boolean = false;
  chartData: ReturnType<typeof generateChartDataFromUsers> | null = null;
  stats: ReturnType<typeof generateStatsFromUsers> | null = null;
  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }

  // Загрузка пользователей (симуляция API)
  async loadUsers() {
    this.setLoading(true);

    // Симуляция задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.users = mockUsers;
    this.chartData = generateChartDataFromUsers(this.users);
    this.stats = generateStatsFromUsers(this.users);

    this.setLoading(false);
  }
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
  get activeUsersCount() {
    return this.users.filter((user) => user.status === "active").length;
  }
  get totalUsers() {
    return this.users.length;
  }

  // Статистика для карточек
  get userStats() {
    if (this.stats) {
      return this.stats;
    }

    return generateStatsFromUsers(this.users);
  }

  // Данные для графиков
  get userChartData() {
    if (this.chartData) {
      return this.chartData;
    }

    return generateChartDataFromUsers(this.users);
  }

  // CRUD операции
  addUser(user: Omit<User, "id">): void {
    const newUser: User = {
      ...user,
      id: Math.max(0, ...this.users.map((u) => u.id)) + 1,
    };
    this.users = [...this.users, newUser];
    // Обновляем данные графиков после добавления пользователя
    this.chartData = generateChartDataFromUsers(this.users);
    this.stats = generateStatsFromUsers(this.users);
  }
  updateUser(updatedUser: User): void {
    this.users = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    // Обновляем данные графиков после изменения пользователя
    this.chartData = generateChartDataFromUsers(this.users);
    this.stats = generateStatsFromUsers(this.users);
  }
  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
    // Обновляем данные графиков после удаления пользователя
    this.chartData = generateChartDataFromUsers(this.users);
    this.stats = generateStatsFromUsers(this.users);
  }
  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }

  // Поиск и фильтрация
  searchUsers(query: string): User[] {
    if (!query) return this.users;

    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
    );
  }
  getUsersByStatus(status: User["status"]): User[] {
    return this.users.filter((user) => user.status === status);
  }

  getUsersByRole(role: string): User[] {
    return this.users.filter((user) => user.role === role);
  }
  // Новые методы с бизнес-логикой
  createUser(userData: Omit<User, "id">) {
    this.addUser(userData);
  }
  editUser(userId: number, userData: Partial<User>) {
    const user = this.getUserById(userId);
    if (user) {
      this.updateUser({ ...user, ...userData });
    }
  }
  removeUser(userId: number) {
    this.deleteUser(userId);
  }
}
export default new UserStore();
