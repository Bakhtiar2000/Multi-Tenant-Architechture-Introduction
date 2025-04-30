import express, { Request, Response } from "express";
import { Tenant, TenantFeature } from "./tenant.model";
import { catchAsync } from "../../utils/catchAsync";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.super_admin),
  catchAsync(async (req: Request, res: Response) => {
    const tenants = await Tenant.find();
    res.json({ message: "Tenants retrieved successfully!", data: tenants });
  })
);

// POST A TENANT
router.post(
  "/",
  auth(USER_ROLE.super_admin),
  catchAsync(async (req: Request, res: Response) => {
    const input = req.body;
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

    const tenantId =
      slugify(input.name) + "-" + Math.random().toString(36).substring(2, 8);

    // Check if tenantId already exists (extremely rare but good to check)
    const existingTenant = await Tenant.findOne({ tenantId });
    if (existingTenant) {
      throw new ApiError(
        httpStatus.CONFLICT,
        "Generated tenantId conflict. Please try again."
      );
    }

    const tenant = await Tenant.create({
      name: input.name,
      ownerEmail: input.ownerEmail,
      plan: input.plan || "free",
      tenantId,
    });

    await User.create({
      name: `${tenant.tenantId} Admin-01`,
      password: await bcrypt.hash("admin", 10),
      email: tenant.ownerEmail,
      tenantId: tenant.tenantId,
      role: "admin",
    });

    res.status(201).json({
      message: "Tenant created successfully",
      data: tenant,
    });
  })
);

router.get(
  "/features",
  auth(USER_ROLE.super_admin),
  catchAsync(async (req: Request, res: Response) => {
    const tenants = await TenantFeature.find();
    res.json({ message: "Tenants retrieved successfully!", data: tenants });
  })
);

export const TenantRoutes = router;
