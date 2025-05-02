import { validateToken } from "../config/tokens";
import { RequestHandler } from "express";

const validateUser: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.sendStatus(401);
  const { user } = validateToken(token);
  if (!user) res.sendStatus(401);
  req.user = user;
  next();
};

export { validateUser };
