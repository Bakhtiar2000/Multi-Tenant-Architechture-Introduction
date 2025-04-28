import express, { Request, Response } from "express";
import { User } from "./user.model";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import checkTenant from "../../utils/checkTenant";
import { catchAsync } from "../../utils/catchAsync";
import ApiError from "../../errors/ApiError";

const router = express.Router();

router.get(
  "/",
  auth(USER_ROLE.admin),
  catchAsync(async (req: Request, res: Response) => {
    const requestedAdmin = await User.findOne({
      _id: req.user.userId,
      tenantId: req.tenantId,
    });
    if (!requestedAdmin) {
    }
    const users = await User.find({ tenantId: req.tenantId });
    res
      .status(201)
      .json({ message: "Users retieved successfully!", data: users });
  })
);

router.post(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    await checkTenant(req.tenantId);
    const payload = req.body;
    if (payload.role == "super_admin")
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
    const existingUser = await User.findOne({
      email: payload.email,
      tenantId: req.tenantId,
    });
    if (existingUser)
      throw new ApiError(httpStatus.CONFLICT, "User already exists!");

    const newHashedPassword = await bcrypt.hash(payload?.password, 10);
    payload.password = newHashedPassword;
    const user = await User.create({ ...payload, tenantId: req.tenantId });
    res.status(201).json({ message: "User created successfully!", data: user });
  })
);

export const UserRoutes = router;

// nokia-88zvu9.fahim   samsung-8go31u.fahim   hubspot-6wp2fd.fahim   xiomi-p0djqe.fahim
