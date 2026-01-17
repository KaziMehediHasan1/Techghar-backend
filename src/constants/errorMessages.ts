export const ERROR_MESSAGES = {
  // 1. Authentication & Authorization
  auth: {
    forgetPasswordFailed: {
      statusCode: 500,
      message:
        "Failed to process password reset request. Please try again later.",
    },
    notFound: { statusCode: 404, message: "User account not found!" },
    registrationFailed: {
      statusCode: 400,
      message: "User registration failed! Please try again.",
    },
    invalid: { statusCode: 401, message: "Invalid email or password!" },
    exists: { statusCode: 409, message: "Email already registered!" },
    unauthorized: { statusCode: 401, message: "Please login to continue!" },
    forbidden: {
      statusCode: 403,
      message: "Access denied! Permissions required.",
    },
    deleteNotFound: {
      statusCode: 404,
      message: "Delete failed! User account not found.",
    },
    deleteForbidden: {
      statusCode: 403,
      message:
        "Access denied! You do not have permission to delete this account.",
    },
  },
  profile: {
    updateFailed: {
      statusCode: 400,
      message:
        "Failed to update profile. Please ensure the data is correct and try again.",
    },
    notFound: {
      statusCode: 404,
      message: "User profile not found!",
    },
    createFailed: {
      statusCode: 400,
      message:
        "Failed to create profile. Please check your data and try again.",
    },
    emptyUpdate: {
      statusCode: 400,
      message: "Update failed: No data provided to update.",
    },
    invalidAddress: {
      statusCode: 400,
      message: "Invalid address format. Please provide all required fields.",
    },
    duplicateProfile: {
      statusCode: 409,
      message: "A profile already exists for this user.",
    },
    fetchFailed: {
      statusCode: 500,
      message: "Something went wrong while fetching the profile.",
    },
    deleteFailed: {
      statusCode: 400,
      message: "Could not delete the profile. It might not exist.",
    },
    unauthorized: {
      statusCode: 401,
      message: "You are not authorized to perform this action.",
    },
  },

  // 2. Products, Categories & Brands
  product: {
    create: {
      statusCode: 400,
      message: "Failed to create product. Please try again.",
    },
    delete: {
      statusCode: 400,
      message: "Failed to delete product. Please try again.",
    },
    update: {
      statusCode: 400,
      message: "Failed to update product. Please try again.",
    },
    get: {
      statusCode: 404,
      message: "Product not found.",
    },
    fetchAll: {
      statusCode: 404,
      message: "No products found.",
    },
    notFound: { statusCode: 404, message: "Product no longer available!" },
    outOfStock: {
      statusCode: 400,
      message: "Product is currently out of stock!",
    },
    invalidCat: { statusCode: 404, message: "Category not found!" },
    invalidBrand: { statusCode: 404, message: "Brand not found!" },
    lowStock: { statusCode: 400, message: "Insufficient stock available!" },
  },

  // 3. Cart & Orders
  order: {
    emptyCart: { statusCode: 400, message: "Your cart is empty!" },
    notFound: { statusCode: 404, message: "Order details not found!" },
    limit: { statusCode: 400, message: "Maximum purchase limit exceeded!" },
    cancelError: { statusCode: 400, message: "Order cannot be cancelled now!" },
    statusError: { statusCode: 400, message: "Invalid order status update!" },
  },

  // 4. Payment & Coupons
  payment: {
    failed: {
      statusCode: 402,
      message: "Transaction failed! Please try again.",
    },
    invalidCoupon: {
      statusCode: 400,
      message: "Promo code is invalid or expired!",
    },
    couponUsed: { statusCode: 400, message: "Promo code already used!" },
    lowAmount: {
      statusCode: 400,
      message: "Minimum order amount not reached!",
    },
    declined: { statusCode: 400, message: "Payment declined by your bank!" },
  },

  // 5. Profile & Reviews
  user: {
    updateFailed: { statusCode: 400, message: "Profile update failed!" },
    noPermission: { statusCode: 403, message: "You cannot edit this profile!" },
    reviewExists: {
      statusCode: 400,
      message: "You already reviewed this product!",
    },
    badRating: { statusCode: 400, message: "Please provide a valid rating!" },
    notPurchased: {
      statusCode: 403,
      message: "Purchase product to leave a review!",
    },
    adminDeleteNotFound: {
      statusCode: 404,
      message:
        "User not found! The account you are trying to delete does not exist.",
    },
    adminDeleteForbidden: {
      statusCode: 403,
      message:
        "Access denied! You do not have the required administrative permissions.",
    },
    adminDeleteFailed: {
      statusCode: 400,
      message: "Failed to delete user account due to a system error.",
    },
  },
  promotion: {
    notFound: {
      statusCode: 404,
      message: "Promotion not found!",
    },
    expired: {
      statusCode: 400,
      message: "This promotion campaign has already ended.",
    },
    deleteFailed: {
      statusCode: 500,
      message:
        "A server error occurred while attempting to delete the promotion.",
    },
    notStarted: {
      statusCode: 400,
      message: "This promotion is scheduled for a future date.",
    },
    duplicate: {
      statusCode: 409,
      message: "A promotion with this code or title already exists!",
    },
    updateFailed: {
      statusCode: 400,
      message: "Failed to update promotion. Please check your data.",
    },

    creationFailed: {
      statusCode: 400,
      message: "Failed to create promotion. Please check input data.",
    },
  },

  // 6. Blogs, Promotions & Contact
  content: {
    blogNotFound: { statusCode: 404, message: "Blog post not found!" },
    promoExpired: { statusCode: 400, message: "This offer has ended!" },
    msgFailed: { statusCode: 400, message: "Message could not be sent!" },
    invalidSearch: {
      statusCode: 400,
      message: "No results found for your query!",
    },
  },
  // 7. System/Global
  review: {
    notFound: { statusCode: 404, message: "Review not found!" },
    creationFailed: {
      statusCode: 400,
      message: "Failed to post review! Please try again.",
    },
    updateFailed: { statusCode: 400, message: "Failed to update review!" },
    duplicate: {
      statusCode: 409,
      message: "You have already reviewed this item!",
    },
    deleteNotFound: {
      statusCode: 404,
      message: "Delete failed! This review no longer exists.",
    },
    // If a user tries to delete a review that isn't theirs
    deleteForbidden: {
      statusCode: 403,
      message: "Access denied! You can only delete reviews you have created.",
    },
    unauthorized: {
      statusCode: 401,
      message: "Please login to manage reviews!",
    },
    forbidden: {
      statusCode: 403,
      message: "Access denied! You can only edit your own reviews.",
    },
    invalidData: {
      statusCode: 422,
      message: "Invalid review data! Please check your rating and comments.",
    },
  },

  // 8. System/Global
  global: {
    serverError: {
      statusCode: 500,
      message: "Something went wrong! Try later.",
    },
    notFound: { statusCode: 404, message: "Requested resource not found!" },
    badRequest: { statusCode: 400, message: "Invalid data provided!" },
    tooMany: { statusCode: 429, message: "Too many requests! Slow down." },
  },
} as const;
