import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  tenantId: { type: String, unique: true },
  name: String,
  plan: String,
  createdAt: { type: Date, default: Date.now },
});

export const Tenant = mongoose.model("Tenant", tenantSchema);
