import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    tenantId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    ownerEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    plan: {
      type: String,
      enum: ["free", "standard", "premium"],
      default: "free",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Tenant = mongoose.model("Tenant", tenantSchema);
