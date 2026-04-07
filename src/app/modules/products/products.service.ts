import productsModel from "@/app/modules/products/products.model.js";
import AppError from "@/utils/appError.js";
import { ERROR_MESSAGES } from "@/constants/errorMessages.js";

const createProductIntoDB = async (payload: any) => {
  const result = await productsModel.create(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.create.statusCode,
      ERROR_MESSAGES.product.create.message,
    );
  }
  return result;
};

const getAllProductsIntoDB = async (payload: any) => {
  const { search, price, category, brand, colors, cursor, page, limit, sort } =
    payload;

  let query: any = {};
  const Limit = Number(limit) || 10;
  const Page = Number(page) || 1;
  const skipPage = (Page - 1) * Limit;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  // 2. Advanced Price Range Parser ($2,000.00 - $3,000.00)
  if (price && typeof price === "string" && price.includes("-")) {
    const range = price
      .split("-")
      .map((p) => Number(p.replace(/[^0-9.]/g, "")));

    if (range.length === 2) {
      query.price = { $gte: range[0], $lte: range[1] };
    }
  } else if (price) {
    const numericPrice = Number(price.toString().replace(/[^0-9.]/g, ""));
    query.price = { $lte: numericPrice };
  }

  if (category) {
    query.category = category;
  }
  if (brand) {
    query.brand = brand;
  }
  if (colors) {
    query.colors = colors;
  }
  
  let sortOptions: any = { createdAt: -1 }; 

  if (sort) {
    switch (sort) {
      case "price_asc":
        sortOptions = { price: 1 };
        break;
      case "price_desc":
        sortOptions = { price: -1 };
        break;
      case "date_asc":
        sortOptions = { createdAt: 1 }; 
        break;
      case "date_desc":
        sortOptions = { createdAt: -1 }; 
        break;
      default:
        sortOptions = { createdAt: -1 };
    }
  }

  // cursor / infinity based pagination -
  if (cursor) {
    query._id = { $lt: cursor };
  }

  const totalDataCount = await productsModel.countDocuments(query);
  const result = await productsModel
    .find(query)
    .sort(sortOptions)
    .limit(Limit)
    .skip(skipPage);

  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.fetchAll.statusCode,
      ERROR_MESSAGES.product.fetchAll.message,
    );
  }
  return {
    result,
    meta: {
      page: Page,
      limit: Limit,
      total: totalDataCount,
      totalPage: Math.ceil(totalDataCount / Limit),
    },
  };
};

const getNewProductsIntoDB = async () => {
  const result = await productsModel.find().sort({ createdAt: -1 }).limit(10);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.fetchAll.statusCode,
      ERROR_MESSAGES.product.fetchAll.message,
    );
  }
  return result;
};

const getProductIntoDB = async (payload: string) => {
  const result = await productsModel.findById(payload);
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.get.statusCode,
      ERROR_MESSAGES.product.get.message,
    );
  }
  return result;
};

const deleteProductIntoDB = async (payload: string) => {
  const result = await productsModel.findOneAndDelete({ _id: payload });
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.delete.statusCode,
      ERROR_MESSAGES.product.delete.message,
    );
  }
  return result;
};

const updateProductIntoDB = async (payload: any) => {
  const { id, data } = payload;
  if (!data) {
    throw new AppError(400, "Please given your updated data.");
  }
  const result = await productsModel.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      ERROR_MESSAGES.product.update.statusCode,
      ERROR_MESSAGES.product.update.message,
    );
  }
  return result;
};

export const productService = {
  getNewProductsIntoDB,
  createProductIntoDB,
  getAllProductsIntoDB,
  getProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
};
