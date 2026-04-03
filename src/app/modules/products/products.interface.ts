export interface ISpecification {
  label: string;
  value: string;
}

export interface IProduct {
  _id: string;
  title: string;
  modelName?: string;
  series?: string;
  sku?: string;

  description: string;
  category: "Headphone" | "PC Componet" | "Light" | "Monitor" | "Phone" | "PC";
  brand: string;

  colors: string[];

  // Pricing Section
  price: number;
  discount: number;
  finalPrice: number;

  // Inventory & Status
  stock: boolean;
  quantity: number;
  isActive: boolean;

  // Media (Array of Image URLs)
  images: string[];

  // Details Page Specific
  features?: string[];
  specs?: ISpecification[];
  warranty?: string;

  // Rating & Social Proof
  averageRating: number;
  totalReviews: number;

  embedding: number[];
  embedding_text: string;

  // Timestamps
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type IProductDetailResponse = IApiResponse<IProduct>;
