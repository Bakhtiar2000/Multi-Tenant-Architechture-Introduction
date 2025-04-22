import express, { Request, Response } from "express";
import { Product } from "./product.model";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const products = await Product.find({ tenantId: req.tenantId });
  res.json(products);
});

router.post("/", async (req: Request, res: Response) => {
  const product = await Product.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(product);
});

export const ProductRoutes = router;
