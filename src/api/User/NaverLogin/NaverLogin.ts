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
      const { naverAuthId, name, email, avatar, gender } = args;
      const naverExisting = await prisma.user({ naverAuthId });
      const emailExisting = await prisma.user({ email });
      const oldAuth = await prisma.user({ email }).naverAuthId();
      try {
        if (naverExisting) {
          if (oldAuth === naverAuthId || oldAuth === null) {
            const token = createJwt(naverExisting.id);
            await prisma.updateUser({
              where: { naverAuthId },
              data: { email, name, avatar, gender }
            });
            return {
              ok: true,
              status: "네이버 로그인이 성공적으로 완료되었습니다.",
              token
            };
          } else {
            return {
              ok: false,
              status:
                "이메일로 가입된 계정이있습니다. 다른이메일을 사용하시거나 이메일 로그인을 이용하세요",
              token: null
            };
          }
        } else {
          if (emailExisting) {
            const token = createJwt(emailExisting.id);
            await prisma.updateUser({
              where: { email },
              data: { name, avatar, gender, naverAuthId }
            });
            return {
              ok: true,
              status: "네이버 로그인이 성공적으로 완료되었습니다.",
              token
            };
          } else {
            const newUser = await prisma.createUser({ ...args });
            const token = createJwt(newUser.id);
            return {
              ok: true,
              status: "네이버 가입이 성공적으로 완료되었습니다",
              token
            };
          }
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
