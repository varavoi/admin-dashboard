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
  constructor(){
    makeAutoObservable(this)
  }
  get activeUsersCount(){
    return this.users.filter(user=>user.status==='active').length
  }
  get totalUsers(){
    return this.users.length
  }
}
export default new UserStore()
