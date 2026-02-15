import type { ObjectId } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  phone: string;
  userId: ObjectId;
  description: string;
  embedding: { type: number[] };
}
