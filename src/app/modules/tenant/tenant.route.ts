import express, { Request, Response } from "express";
import { Tenant } from "./tenant.model";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const tenants = await Tenant.find();
  res.json(tenants);
});

router.post("/", async (req: Request, res: Response) => {
  const tenant = await Tenant.create({
    ...req.body,
    tenantId: req.user.tenantId,
  });
  res.status(201).json(tenant);
});

export const tenantRoutes = router;
