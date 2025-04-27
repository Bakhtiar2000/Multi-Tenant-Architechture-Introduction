import express, { Request, Response } from "express";
import { Tenant } from "./tenant.model";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const tenants = await Tenant.find();
  res.json({ message: "Tenants retrieved successfully!", data: tenants });
});

// POST A TENANT
router.post("/", async (req: Request, res: Response) => {
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
    throw new Error("Generated tenantId conflict. Please try again.");
  }

  const tenant = await Tenant.create({
    name: input.name,
    ownerEmail: input.ownerEmail,
    plan: input.plan || "free",
    tenantId,
  });
  res.status(201).json({
    message: "Tenant created successfully",
    data: tenant,
  });
});

export const tenantRoutes = router;
