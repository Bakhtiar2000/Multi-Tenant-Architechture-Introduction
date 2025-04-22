import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  tenantId: { type: String, required: true },
  name: String,
  price: Number,
  stock: Number,
});

export const Product = mongoose.model("Product", productSchema);
