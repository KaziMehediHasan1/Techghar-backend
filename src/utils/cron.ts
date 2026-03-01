import cron from "node-cron";
import { genericSyncEmbeddings } from "@/app/modules/chatbot/bot.utils.js";
import contactModel from "@/app/modules/contact/contact.model.js";
import productsModel from "@/app/modules/products/products.model.js";
import type { IProduct } from "@/app/modules/products/products.interface.js";
import type { IContact } from "@/app/modules/contact/comtact.interface.js";
import type { IBlog } from "@/app/modules/blog/blog.interface.js";
import blogModel from "@/app/modules/blog/blog.model.js";
import type { ICoupon } from "@/app/modules/coupon/coupon.interface.js";
import couponModel from "@/app/modules/coupon/coupon.model.js";

export const setupCronJobs = () => {
  cron.schedule("0 3 * * *", async () => {
    // 1. Sync Products
    await genericSyncEmbeddings<IProduct>(
      productsModel,
      async (p: any) => {
        // 1. Review array theke shudhu comment ar rating neya
        const reviewSummary =
          p.reviews && p.reviews.length > 0
            ? p.reviews
                .map((r: any) => `Rating: ${r.rating}, Comment: ${r.comment}`)
                .join(" | ")
            : "No reviews available.";

        // 2. Final String -
        return (
          `Title: ${p.title} | Brand: ${p.brand} | Category: ${p.category} | ` +
          `Price: ${p.price} | Description: ${p.description} | ` +
          `Average Rating: ${p.averageRating} | Reviews: ${reviewSummary}`
        );
      },
      "reviews", // Virtual fields name
    );

    // 2. Sync Contacts
    await genericSyncEmbeddings<IContact>(
      contactModel,
      (c) =>
        `Contact: ${c.name} | Message: ${c.email} | Phone: ${c.phone} | Full-Address: ${c.description}`,
    );

    // 3. Sync Blog
    await genericSyncEmbeddings<IBlog>(
      blogModel,
      (b) =>
        `Blog Name: ${b.title} | Full-Blog: ${b.description} | Blog-Category: ${b.category}`,
    );

    // 4. coupon or discunt card -
    await genericSyncEmbeddings<ICoupon>(
      couponModel,
      (c) =>
        `Coupon-Code: ${c.code} | Coupon-ExpireData: ${c.expiryDate} | Min-OrdertoUse-ThisCoupon: ${c.minOrderAmount}`,
    );

    console.log("All models synced!");
  });
};
