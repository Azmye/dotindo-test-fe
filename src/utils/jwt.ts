import { SignJWT, jwtVerify } from "jose";
import { User } from "../types/user";

export const generateToken = async (user: User) => {
  try {
    const token = await new SignJWT({ ...user })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Set headers here
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET_KEY)); // Encode secret key
    return token;
  } catch (err) {
    console.error("Token generation failed:", err);
    throw err;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET_KEY)
    );
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
};
