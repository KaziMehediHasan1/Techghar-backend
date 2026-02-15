import type { TRole } from "@/types/auth.type.js";

export interface IUserSchema {
  uid: string;
  name: string;
  email: string;
  password: string;
  resetPasswordToken?: string | null;
  resetPasswordExpire?: Date | null;
  photo: string;
  role: "admin" | "user";
  createdAt: Date;
  embedding: { type: number[] };
}

export interface IJwtUser {
  id: string;
  role: TRole;
  email: string;
}

// perameter types -
export interface IUserFiltering {
  search: string;
  role?: { user: string; admin: string };
}

export interface SearchQuery {
  name?: string | { $regex: string; $options: string };
}
