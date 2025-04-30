import express, { Request, Response } from "express";
import { Order } from "./order.model";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
import { catchAsync } from "../../utils/catchAsync";
import checkTenant from "../../utils/checkTenant";
import { checkFeatureAccess } from "../../middleWear/checkFeatureAccess";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin),
  checkFeatureAccess("order-management"),
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const orders = await Order.find({ tenantId: req.tenantId });
    res.json({ message: "Orders fetched successfully!", data: orders });
  })
);

router.post(
  "/",
  auth(USER_ROLE.admin),
  checkFeatureAccess("order-management"),
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const order = await Order.create({
      ...req.body,
      tenantId: req.tenantId,
    });
    res
      .status(201)
      .json({ message: "Order placed successfully!", data: order });
  })
);

export const OrderRoutes = router;
