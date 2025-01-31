import mongoose, { Mongoose, Schema, model } from "mongoose";

const websiteSchema = new Schema(
  {
    language: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    nofollow: {
      type: Boolean,
      default: false,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    webDomain: {
      type: String,
      trim: true,
    },
    mediaName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    netProfit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicationGuidelines: {
      type: String,
      required: true,
    },
    publicationDuration: {
      type: String,
      required: true,
    },
    averagePublicationTime: {
      type: String,
      required: true,
    },
    socialMedia: {
      facebook: [String],
      instagram: [String],
      tiktok: [String],
      reddit: [String],
      telegram: [String],
    },
    sensitiveTopics: [
      {
        type: String,
      },
    ],
    googleNews: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Boolean,
      default: false,
    },
    slots: {
      type: Number,
      default: 0,
    },
    pricePerPublication: {
      type: Number,
      default: 0,
    },
    highlightMonths: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "flagged", "rejected"],
      default: "pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Website", websiteSchema);
