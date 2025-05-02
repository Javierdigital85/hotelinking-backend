import { UserPayload } from "../config/tokens";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
