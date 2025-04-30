import { Request, Response, NextFunction } from "express";
import { Feature } from "../modules/feature/feature.model";
import { TenantFeature } from "../modules/tenant/tenant.model";
import { catchAsync } from "../utils/catchAsync";
import ApiError from "../errors/ApiError";

export const checkFeatureAccess = (featureSlug: string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.tenantId;

    const feature = await Feature.findOne({ slug: featureSlug });
    if (!feature) throw new ApiError(404, "Feature not found.");

    const access = await TenantFeature.findOne({
      tenantId,
      featureId: feature._id,
      status: "allowed",
    });

    if (!access) {
      res.status(403).json({ message: "Access to this feature is denied." });
    }

    next();
  });
};
