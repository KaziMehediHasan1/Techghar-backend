import type mongoose from "mongoose";

type IAddress = {
  fullName: string;
  street?: string;
  city: string;
  state: string;
  addressLine: string;
  zipCode: string;
  phone: string;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
};
export interface IProfile {
  userID: mongoose.Schema.Types.ObjectId;
  address: IAddress[];
  orders: string[];
  wishlist: string[];
  reviews: string[];
  createdAt: Date;
  updatedAt: Date;
}
