import { NextFunction, Request, Response } from "express";

const tenantScope = (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.header("tenant-id");
  if (!tenantId) return res.status(401).json({ error: "Tenant ID required" });
  req.user.tenantId = tenantId;
  next();
};

export default tenantScope;
