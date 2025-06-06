import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole, User } from "../modules/user/user.model";
import ApiError from "../errors/ApiError";
import { verifyToken } from "../modules/auth/auth.utils";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    const host = req.headers.host as string;
    const subDomainTenantId = host.split(".")[0];

    //Check if token is sent
    if (!token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Token not found: Unauthorized User!"
      );
    }

    // If token found, then verify token and find out decoded jwtPayload fields
    let decoded;
    try {
      decoded = verifyToken(token, config.jwt_access_secret as string);
    } catch (error) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Unauthorized access happened"
      );
    }

    const { userId, role, tenantId } = decoded;
    console.log(decoded);
    const user = await User.findOne({ _id: userId, tenantId });

    // Check if user exists
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
    }
    if (decoded.tenantId !== subDomainTenantId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Tenant mismatch");
    }

    // // Check if user is deleted
    // const isUserDeleted = user?.isDeleted;
    // if (isUserDeleted) {
    //   throw new ApiError(httpStatus.FORBIDDEN, "User is deleted!");
    // }

    // // Check if user is blocked
    // const userStatus = user?.status;
    // if (userStatus === "blocked") {
    //   throw new ApiError(httpStatus.FORBIDDEN, "User is blocked!");
    // }

    // Check if the request was sent by authorized user or not
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Role mismatched. Unauthorized User!"
      );
    }

    req.user = decoded as JwtPayload;
    // req.tenantId = tenantId;
    next();
  });
};

export default auth;
