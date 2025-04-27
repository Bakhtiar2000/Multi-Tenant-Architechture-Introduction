import mongoose, { Schema } from "mongoose";
import USER_ROLE from "../../constants/userRole";

export type TUserRole = keyof typeof USER_ROLE;

const userSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  name: String,
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export const User = mongoose.model("User", userSchema);
