import type { Types } from "mongoose";

export type TAuth = {
  uid?: string;
  _id?: Types.ObjectId;
  email: string;
  password?:string;
  role?: string;
};

export type TRole = "admin" | "user";
