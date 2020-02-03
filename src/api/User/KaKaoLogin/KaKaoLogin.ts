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
      const { email, kakaoAuthId, name, avatar, gender } = args;
      const kakaoExtingUser = await prisma.user({ kakaoAuthId });
      const exmail = await prisma.user({ email });
      const oldAuth = await prisma.user({ email }).naverAuthId();
      try {
        if (kakaoExtingUser) {
          if (oldAuth === kakaoAuthId || oldAuth === null) {
            const token = createJwt(kakaoExtingUser.id);
            await prisma.updateUser({
              where: { kakaoAuthId },
              data: { email, name, avatar, gender }
            });
            return {
              ok: true,
              status: "카카오 로그인이 성공적으로 완료되었습니다.",
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
          if (exmail) {
            const token = createJwt(exmail.id);
            await prisma.updateUser({
              where: { email },
              data: { name, avatar, gender, kakaoAuthId }
            });
            return {
              ok: true,
              status: "카카오 로그인이 성공적으로 완료되었습니다.",
              token
            };
          } else {
            const newUser = await prisma.createUser({ ...args });
            const token = createJwt(newUser.id);
            return {
              ok: true,
              status: "카카오 가입이 성공적으로 완료되었습니다",
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
