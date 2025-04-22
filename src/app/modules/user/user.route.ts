import express, { Request, Response } from "express";
import { User } from "./user.model";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const users = await User.find({ tenantId: req.tenantId });
  res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body, tenantId: req.tenantId });
  res.status(201).json(user);
});

export const UserRoutes = router;
