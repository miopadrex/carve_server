import bcrypt from "bcrypt";

export const passwordHashed = (pw: string): Promise<string> => {
  const BCRYPT_ROUND = 12;
  const hashPassword = bcrypt.hash(pw, BCRYPT_ROUND);
  return hashPassword;
};
