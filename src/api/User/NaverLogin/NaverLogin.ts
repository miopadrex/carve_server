import { prisma } from "../../../generated/prisma-client";
import {
  NaverLoginMutationArgs,
  NaverLoginResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";

const resolvers: Resolvers = {
  Mutation: {
    NaverLogin: async (
      _,
      args: NaverLoginMutationArgs
    ): Promise<NaverLoginResponse> => {
      const { id } = args;
      try {
        const extingUser = await prisma.user({ id });
        if (!extingUser) {
          const newUser = await prisma.createUser({ ...args });
          const token = createJwt(newUser.id);
          return {
            ok: true,
            status: "네이버 로그인이 성공적으로 완료되었습니다.",
            token
          };
        } else {
          return {
            ok: false,
            status: "이미 네이버 아이디으로 가입하신 계정이 존재합니다.",
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
