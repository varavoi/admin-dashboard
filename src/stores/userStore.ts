import { makeAutoObservable } from "mobx";
import type { User } from "../types";

class UserStore {
  users: User[] = [
    {
      id: 1,
      name: "Иван Иванов",
      email: "ivan@mail.com",
      role: "Администратор",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Петр Петров",
      email: "petr@mail.com",
      role: "Пользователь",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Мария Сидорова",
      email: "maria@mail.com",
      role: "Модератор",
      status: "inactive",
      joinDate: "2024-03-10",
    },
  ];
  constructor() {
    makeAutoObservable(this);
  }
  get activeUsersCount() {
    return this.users.filter((user) => user.status === "active").length;
  }
  get totalUsers() {
    return this.users.length;
  }
  // CRUD операции
  addUser(user: Omit<User, "id">): void {
    const newUser: User = {
      ...user,
      id: Math.max(0, ...this.users.map((u) => u.id)) + 1,
    };
    this.users=[...this.users,newUser];
  }
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      this.users = this.users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
    }
  }
  deleteUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }
  getUserById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
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
  // Статистические методы
  getUsersByStatus(status: User["status"]) {
    return this.users.filter((user) => user.status === status);
  }
  getUsersByRole(role: string) {
    return this.users.filter((user) => user.role === role);
  }
}
export default new UserStore();
