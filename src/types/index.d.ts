import type { IJwtUser } from "@/app/modules/user/user.interface.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtUser;
    }
  }
}
