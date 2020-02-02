import jwt from "jsonwebtoken";
import { prisma } from "../generated/prisma-client";

const decodeJwt = async (token: string) => {
  const decode: any = jwt.verify(token, process.env.JWT_SECRET || "");
  const { id } = decode;
  const user = await prisma.user({ id });

  return user;
};

export default decodeJwt;
