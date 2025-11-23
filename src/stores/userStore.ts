import { makeAutoObservable } from "mobx";
import type { User } from "../types";
import { mockUsers } from "../mocks/data";
import { ChartDataService } from "../services/chartDataService";

class UserStore {
  users: User[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }

  // Загрузка пользователей (симуляция API)
  async loadUsers() {
    this.setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.users = mockUsers;
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

  // Получаем расширенные данные для аналитики
  getAdvancedAnalytics() {
    return ChartDataService.generateAdvancedAnalytics(this.users);
  }

  // Получаем обычные (не observable) данные для графиков
  getChartData() {
    // Гарантируем, что всегда возвращаем данные
    return ChartDataService.getAllChartData(this.users);
  }

  // CRUD операции
  addUser(user: Omit<User, "id">): void {
    const newUser: User = {
      ...user,
      id: Math.max(0, ...this.users.map((u) => u.id)) + 1,
    };
    this.users = [...this.users, newUser];
  }

  updateUser(updatedUser: User): void {
    this.users = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
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

  // Бизнес-методы
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