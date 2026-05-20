import mongoose, { Schema, Document } from "mongoose";

export interface IFeed extends Document {
  content: string;
  createdAt: Date;
}

const FeedSchema = new Schema<IFeed>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFeed>("Feed", FeedSchema);