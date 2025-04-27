import express, { Request, Response } from "express";
import { User } from "./user.model";
import getTenantFromSubdomain from "../../middleWear/getTenantFromSubdomain";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
const router = express.Router();

router.get("/", auth(USER_ROLE.admin), async (req: Request, res: Response) => {
  const users = await User.find({ tenantId: req.tenantId });
  res.json(users);
});

router.post(
  "/",
  getTenantFromSubdomain,
  async (req: Request, res: Response) => {
    console.log(req.body, req.tenantId);
    const user = await User.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json(user);
  }
);

export const UserRoutes = router;

// shopify-q1aqn7.fahim   blackberry-d8rkg0.fahim   hubspot-iavyt8.fahim
