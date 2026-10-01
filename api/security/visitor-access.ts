import { verifyAdminToken } from "./auth";
import { visitorFromRequest } from "./visitor-session";

export async function visitorAccessStatus(req: Request) {
  const token = req.headers.get("x-admin-token");
  const owner = Boolean(token && await verifyAdminToken(token));
  return { admitted: owner || Boolean(await visitorFromRequest(req)), owner };
}
