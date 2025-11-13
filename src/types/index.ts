export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
}
export interface chartData{
    name:string;
    value:number;
}