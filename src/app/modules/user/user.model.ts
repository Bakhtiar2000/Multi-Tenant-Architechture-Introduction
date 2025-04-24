import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
  name: String,
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const User = mongoose.model("User", userSchema);
