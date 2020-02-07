import { prisma, User } from "../../../generated/prisma-client";
import {
  SignEmailVerifyCompleteMutationArgs,
  SignEmailVerifyCompleteResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    SignEmailVerifyComplete: async (
      _,
      args: SignEmailVerifyCompleteMutationArgs,
      { request, isAuth }
    ): Promise<SignEmailVerifyCompleteResponse> => {
      isAuth(request);
      const user: User = request.user;
      const { email } = args;
      const { key } = args;
      const authComplete = await prisma.$exists.verification({
        payload: user.email
      });
      if (authComplete) {
        try {
          const verification = await prisma.verification({
            payload: email
          });
          if (verification?.key === key) {
            await prisma.updateUser({
              where: { id: user.id },
              data: { emailVerfied: true }
            });
            await prisma.updateVerification({
              where: { id: verification.id },
              data: { verified: true }
            });
            return {
              ok: true,
              status: "이메일인증이 완료되었습니다."
            };
          } else {
            return {
              ok: false,
              status: "인증번호가 맞지않습니다."
            };
          }
        } catch (error) {
          return {
            ok: false,
            status: error
          };
        }
      } else {
        return {
          ok: false,
          status: "권한이없습니다"
        };
      }
    }
  }
};

export default resolvers;
