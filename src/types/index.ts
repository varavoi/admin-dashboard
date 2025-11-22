export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}
export type UserFormData = Omit<User, "id" | "joinDate"> & {
  status: "active" | "inactive";
};
export interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
}
export interface chartData{
    name:string;
    value:number;
}