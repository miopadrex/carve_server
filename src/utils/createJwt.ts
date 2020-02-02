import jwt from "jsonwebtoken";

const createJwt = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "");
  return token;
};

export default createJwt;
