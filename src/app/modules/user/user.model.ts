import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  name: String,
  email: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const User = mongoose.model("User", userSchema);
