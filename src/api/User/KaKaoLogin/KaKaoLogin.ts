import { prisma } from "../../../generated/prisma-client";
import {
  KaKaoLoginMutationArgs,
  KaKaoLoginResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";

const resolvers: Resolvers = {
  Mutation: {
    KaKaoLogin: async (
      _,
      args: KaKaoLoginMutationArgs
    ): Promise<KaKaoLoginResponse> => {
      const { id } = args;
      try {
        const extingUser = prisma.$exists.user({ id });
        if (!extingUser) {
          const newUser = await prisma.createUser({ ...args });
          const token = createJwt(newUser.id);
          return {
            ok: true,
            status: "카카오톡 로그인이 성공적으로 완료되었습니다",
            token
          };
        } else {
          return {
            ok: false,
            status: "이미 카카오 아이디로 가입하신 계정이 존재합니다.",
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
