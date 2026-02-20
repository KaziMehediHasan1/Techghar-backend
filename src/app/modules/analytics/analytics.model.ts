import type { IAnalytics } from "@/app/modules/analytics/analytics.interface.js";
import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema<IAnalytics>(
  {
    pagePath: { type: [String], default: ["/"] },
    viewCount: { type: Number, default: 1 },
    click: { type: Number, default: 0 },
    lastVisited: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IAnalytics>("analytics", AnalyticsSchema);
