import { NextFunction, Request, Response } from "express";

const getTenantFromSubdomain = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const host = req.headers.host as string; // e.g., tenantA.returnhex.com
  const tenantId = host.split(".")[0]; // 'tenantA'

  req.tenantId = tenantId;
  next();
};

export default getTenantFromSubdomain;
