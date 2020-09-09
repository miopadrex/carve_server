import { prisma } from "../../../generated/prisma-client";
import { KaKaoLoginMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";

const resolvers: Resolvers = {
  Mutation: {
    KaKaoLogin: async (_, args: KaKaoLoginMutationArgs) => {
      const { email, kakaoAuthId, name, emailVerfied, phoneNumber } = args;
      const kakaoExtingUser = await prisma.user({ kakaoAuthId });
      const exmail = await prisma.user({ email });
      const oldAuth = await prisma.user({ email }).kakaoAuthId();
      try {
        if (kakaoExtingUser) {
          if (oldAuth === kakaoAuthId || oldAuth === null) {
            const token = createJwt(kakaoExtingUser.id);
            const updateUser = await prisma.updateUser({
              where: { kakaoAuthId },
              data: {
                kakaoAuthId,
                name,
                email,
                emailVerfied,
                phoneNumber
              }
            });
            return {
              ok: true,
              status: "카카오 로그인이 성공적으로 완료되었습니다.",
              token,
              user: updateUser
            };
          } else {
            return {
              ok: false,
              status:
                "이메일로 가입된 계정이있습니다. 다른이메일을 사용하시거나 이메일 로그인을 이용하세요",
              token: null,
              user: null
            };
          }
        } else {
          if (exmail) {
            const token = createJwt(exmail.id);
            const updateUser = await prisma.updateUser({
              where: { email },
              data: {
                kakaoAuthId,
                name,
                email,
                emailVerfied,
                phoneNumber
              }
            });
            return {
              ok: true,
              status: "카카오 로그인이 성공적으로 완료되었습니다.",
              token,
              user: updateUser
            };
          } else {
            return {
              ok: true,
              status: "회원가입페이지로 이동합니다",
              token: null,
              user: null
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
