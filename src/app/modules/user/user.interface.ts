import type { TRole } from "@/types/auth.type.js";

export interface IUserSchema {
  uid: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  role: "admin" | "user";
  createdAt: Date;
}

export interface IJwtUser {
  id: string;
  role: TRole;
  email: string;
}
