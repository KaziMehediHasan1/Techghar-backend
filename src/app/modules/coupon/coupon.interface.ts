export enum DiscountType {
  PERCENT = "PERCENT",
  FLAT = "FLAT",
}

export interface ICoupon {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount: number;
  expiryDate: Date;
  maxUsage: number;
  isActive: boolean;
  usedCount: number;
}
