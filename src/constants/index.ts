import type { UserFormData } from "../types";
export const USER_ROLES = {
  USER: 'Пользователь',
  MODERATOR: 'Модератор',
  ADMIN: 'Администратор'
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;

export const CHART_COLORS = {
  primary: '#1976d2',
  success: '#2e7d32',
  warning: '#ed6c02',
  error: '#d32f2f',
  info: '#0288d1'
} as const;

// Начальные значения формы
 export const initialFormData:UserFormData = {
  name: '',
  email: '',
  role: 'Пользователь',
  status: 'active' as 'active' | 'inactive'
};