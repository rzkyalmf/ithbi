import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: "ADMIN" | "USER";
}

export default async function serverAuth() {
  // get token from cookies
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    // verify and return payload
    const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
