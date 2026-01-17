export interface IProduct {
  title: string;
  description: string;
  category: string;
  colors: string;
  brand: string;
  price: number;
  discount: number;
  finalPrice?: number;

  stock: boolean;
  quantity: number;

  images: string[];

  // Rating system (calculated, not user input)
  averageRating: number;
  totalReviews: number;

  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
