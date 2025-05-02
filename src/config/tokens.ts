import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import globalConstants from "../const/globalConstants";

interface UserPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

const generateToken = (payload: UserPayload, expiresIn: string = "2d") => {
  const token = jwt.sign({ user: payload }, globalConstants.SECRET, {
    expiresIn: expiresIn,
  } as SignOptions);
  return token;
};

const validateToken = (token: string): { user: UserPayload } => {
  return jwt.verify(token, globalConstants.SECRET) as { user: UserPayload };
};

export { generateToken, validateToken };
