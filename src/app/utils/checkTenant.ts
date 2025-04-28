import ApiError from "../errors/ApiError";
import { Tenant } from "../modules/tenant/tenant.model";

const checkTenant = async (tenantId: string) => {
  const tenantStatus = await Tenant.findOne({ tenantId });
  if (!tenantStatus) throw new ApiError(404, "Tenant Not Found!");
  return tenantStatus;
};

export default checkTenant;
