import type mongoose from "mongoose";

export interface IReview {
  userId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;

  rating: number; 
  comment: string;
  shortComment?: string;

  isVerifiedPurchase?: boolean;
  isApproved?: boolean;
  embedding: { type: number[] };

  createdAt?: Date;
  updatedAt?: Date;
}
