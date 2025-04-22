import { NextFunction, Request, Response } from "express";

const checkRole = (requiredRole: "admin" | "user") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Forbidden: insufficient privileges" });
    }
    next();
  };
};

export default checkRole;
