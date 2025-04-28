import express, { Request, Response } from "express";
import { Product } from "./product.model";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
import { catchAsync } from "../../utils/catchAsync";
import checkTenant from "../../utils/checkTenant";
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const products = await Product.find({ tenantId: req.tenantId });
    res.json({ message: "Product fetched successfully!", data: products });
  })
);

router.post(
  "/",
  auth(USER_ROLE.admin),
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const product = await Product.create({
      ...req.body,
      tenantId: req.tenantId,
    });
    res
      .status(201)
      .json({ message: "Product created successfully!", data: product });
  })
);

export const ProductRoutes = router;
