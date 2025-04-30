import express, { Request, Response } from "express";
import { Feature } from "./feature.model";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
import { catchAsync } from "../../utils/catchAsync";
import checkTenant from "../../utils/checkTenant";

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const features = await Feature.find();
    res.json({ message: "Features fetched successfully!", data: features });
  })
);

router.post(
  "/",
  auth(USER_ROLE.super_admin),
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const feature = await Feature.create(req.body);
    res
      .status(201)
      .json({ message: "Feature created successfully!", data: feature });
  })
);

export const FeatureRoutes = router;
