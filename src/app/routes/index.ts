import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ProductRoutes } from "../modules/product/product.route";
import { tenantRoutes } from "../modules/tenant/tenant.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/tenants",
    route: tenantRoutes,
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
