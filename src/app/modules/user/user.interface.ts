export interface IUserSchema {
  uid: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: "admin" | "user";
  createdAt: Date;
}
