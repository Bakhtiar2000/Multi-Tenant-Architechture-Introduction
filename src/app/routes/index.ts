import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ProductRoutes } from "../modules/product/product.route";
import { TenantRoutes } from "../modules/tenant/tenant.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/tenants",
    route: TenantRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
