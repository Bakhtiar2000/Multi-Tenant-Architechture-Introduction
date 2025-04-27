import { NextFunction, Request, Response } from "express";

const getTenantFromSubdomain = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const host = req.headers.host as string; // e.g., tenantA.returnhex.com
  const subdomain = host.split(".")[0]; // 'tenantA'
  if (!subdomain) {
    res.status(400).json({ message: "Tenant not found" });
    return;
  }
  req.tenantId = subdomain;
  next();
};

export default getTenantFromSubdomain;
