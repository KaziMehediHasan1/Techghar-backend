export const SUCCESS_MESSAGES = {
  // 1. Authentication & Authorization
  auth: {
    registered: {
      statusCode: 201,
      message: "Account created successfully! Welcome.",
    },
    loggedIn: {
      statusCode: 200,
      message: "Logged in successfully! Welcome back.",
    },
    loggedOut: {
      statusCode: 200,
      message: "Logged out successfully! See you soon.",
    },
    tokenRefreshed: {
      statusCode: 200,
      message: "Session extended successfully!",
    },
  },

  // 2. Products, Categories & Brands
  product: {
    created: { statusCode: 201, message: "Product added successfully!" },
    updated: { statusCode: 200, message: "Product updated successfully!" },
    deleted: { statusCode: 200, message: "Product removed successfully!" },
    fetched: { statusCode: 200, message: "Products retrieved successfully!" },
  },

  // 3. Cart & Orders
  order: {
    addedToCart: { statusCode: 200, message: "Product added to cart!" },
    placed: {
      statusCode: 201,
      message: "Order placed successfully! Thank you.",
    },
    updated: { statusCode: 200, message: "Order status updated successfully!" },
    cancelled: { statusCode: 200, message: "Order cancelled successfully!" },
  },

  // 4. Payment & Coupons
  payment: {
    success: { statusCode: 200, message: "Payment processed successfully!" },
    couponApplied: {
      statusCode: 200,
      message: "Coupon applied! Discount added.",
    },
    refunded: { statusCode: 200, message: "Refund processed successfully!" },
  },

  // 5. User Profile & Reviews
  user: {
    profileUpdated: {
      statusCode: 200,
      message: "Profile information updated!",
    },
    passwordChanged: {
      statusCode: 200,
      message: "Password changed successfully!",
    },
    reviewAdded: { statusCode: 201, message: "Thank you for your review!" },
  },
  // 7.Review
  review: {
    created: {
      statusCode: 201,
      message: "Review posted successfully! Thank you for your feedback.",
    },
    fetched: {
      statusCode: 200,
      message: "Reviews retrieved successfully!",
    },
    updated: {
      statusCode: 200,
      message: "Your review has been updated successfully!",
    },
    deleted: {
      statusCode: 200,
      message: "Review deleted successfully!",
    },
    statusChanged: {
      statusCode: 200,
      message: "Review visibility updated successfully!",
    },
  },

  // 7. Blog & Contact
  content: {
    blogCreated: {
      statusCode: 201,
      message: "Blog post published successfully!",
    },
    messageSent: {
      statusCode: 200,
      message: "Your message has been sent to our team!",
    },
  },
} as const;
