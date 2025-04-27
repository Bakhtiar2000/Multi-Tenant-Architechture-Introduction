import express, { Request, Response } from "express";
import { Product } from "./product.model";
import getTenantFromSubdomain from "../../middleWear/getTenantFromSubdomain";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
const router = express.Router();

router.get("/", getTenantFromSubdomain, async (req: Request, res: Response) => {
  const products = await Product.find({ tenantId: req.tenantId });
  res.json({ message: "Product fetched successfully!", data: products });
});

router.post("/", auth(USER_ROLE.user), async (req: Request, res: Response) => {
  const product = await Product.create({ ...req.body, tenantId: req.tenantId });
  res
    .status(201)
    .json({ message: "Product created successfully!", data: product });
});

export const ProductRoutes = router;
