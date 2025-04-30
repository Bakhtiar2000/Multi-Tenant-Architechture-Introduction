import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // e.g. "dashboard"
    label: { type: String, required: true }, // e.g. "Dashboard Access"
    description: { type: String }, // optional
  },
  { timestamps: true }
);

export const Feature = mongoose.model("Feature", featureSchema);
