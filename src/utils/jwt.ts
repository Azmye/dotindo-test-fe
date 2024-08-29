import { User } from "../types/user";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  return jwt.sign(user, import.meta.env.VITE_JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, import.meta.env.VITE_JWT_SECRET_KEY);
};
