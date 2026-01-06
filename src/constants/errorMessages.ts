export const ERROR_MESSAGES = {
  // 1. Authentication & Authorization
  auth: {
    notFound: { statusCode: 404, message: "User account not found!" },
    registrationFailed: { statusCode: 400, message: "User registration failed! Please try again." },
    invalid: { statusCode: 401, message: "Invalid email or password!" },
    exists: { statusCode: 409, message: "Email already registered!" },
    unauthorized: { statusCode: 401, message: "Please login to continue!" },
    forbidden: { statusCode: 403, message: "Access denied! Permissions required." }
  },

  // 2. Products, Categories & Brands
  product: {
    notFound: { statusCode: 404, message: "Product no longer available!" },
    outOfStock: { statusCode: 400, message: "Product is currently out of stock!" },
    invalidCat: { statusCode: 404, message: "Category not found!" },
    invalidBrand: { statusCode: 404, message: "Brand not found!" },
    lowStock: { statusCode: 400, message: "Insufficient stock available!" }
  },

  // 3. Cart & Orders
  order: {
    emptyCart: { statusCode: 400, message: "Your cart is empty!" },
    notFound: { statusCode: 404, message: "Order details not found!" },
    limit: { statusCode: 400, message: "Maximum purchase limit exceeded!" },
    cancelError: { statusCode: 400, message: "Order cannot be cancelled now!" },
    statusError: { statusCode: 400, message: "Invalid order status update!" }
  },

  // 4. Payment & Coupons
  payment: {
    failed: { statusCode: 402, message: "Transaction failed! Please try again." },
    invalidCoupon: { statusCode: 400, message: "Promo code is invalid or expired!" },
    couponUsed: { statusCode: 400, message: "Promo code already used!" },
    lowAmount: { statusCode: 400, message: "Minimum order amount not reached!" },
    declined: { statusCode: 400, message: "Payment declined by your bank!" }
  },

  // 5. Profile & Reviews
  user: {
    updateFailed: { statusCode: 400, message: "Profile update failed!" },
    noPermission: { statusCode: 403, message: "You cannot edit this profile!" },
    reviewExists: { statusCode: 400, message: "You already reviewed this product!" },
    badRating: { statusCode: 400, message: "Please provide a valid rating!" },
    notPurchased: { statusCode: 403, message: "Purchase product to leave a review!" }
  },

  // 6. Blogs, Promotions & Contact
  content: {
    blogNotFound: { statusCode: 404, message: "Blog post not found!" },
    promoExpired: { statusCode: 400, message: "This offer has ended!" },
    msgFailed: { statusCode: 400, message: "Message could not be sent!" },
    invalidSearch: { statusCode: 400, message: "No results found for your query!" }
  },

  // 7. System/Global
  global: {
    serverError: { statusCode: 500, message: "Something went wrong! Try later." },
    notFound: { statusCode: 404, message: "Requested resource not found!" },
    badRequest: { statusCode: 400, message: "Invalid data provided!" },
    tooMany: { statusCode: 429, message: "Too many requests! Slow down." }
  }
} as const;