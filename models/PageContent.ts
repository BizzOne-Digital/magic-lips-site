import mongoose, { Document, Schema } from "mongoose";
import { getModel } from "@/lib/mongooseModel";

export type PageKey = "home" | "about" | "contact" | "offers";

export interface IPageContent extends Document {
  pageKey: PageKey;
  content: Record<string, unknown>;
  updatedAt: Date;
  createdAt: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      enum: ["home", "about", "contact", "offers"],
    },
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default getModel<IPageContent>("PageContent", PageContentSchema);
