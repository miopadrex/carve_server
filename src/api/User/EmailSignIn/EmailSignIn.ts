import bcrypt from "bcrypt";
import { prisma } from "../../../generated/prisma-client";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      try {
        const { email, password } = args;
        const user = await prisma.user({ email });
        if (!user) {
          return {
            ok: false,
            status: "가입된 이메일이 없습니다.",
            token: null
          };
        }
        const checkPassword = await bcrypt.compare(password, user.password!);
        if (checkPassword) {
          const token = createJwt(user.id);
          return {
            ok: true,
            status: `환영합니다${user.name}`,
            token
          };
        } else {
          return {
            ok: false,
            status: "비밀번호가 틀렸습니다.",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          status: error,
          token: null
        };
      }
    }
  }
};

export default resolvers;
