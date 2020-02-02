import { prisma, User } from "../../../generated/prisma-client";
import {
  CompleteEmailVerifyMutationArgs,
  CompleteEmailVerifyResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerify: async (
      _,
      args: CompleteEmailVerifyMutationArgs,
      { request, isAuth }
    ): Promise<CompleteEmailVerifyResponse> => {
      isAuth(request);
      const user: User = request.user;
      const { key } = args;
      try {
        const findCertification = await prisma.verification({
          payload: user.email
        });
        if (findCertification?.key === key) {
          await prisma.updateUser({
            where: { id: user.id },
            data: { emailVerfied: true }
          });
          await prisma.updateVerification({
            where: { payload: user.email },
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
    }
  }
};

export default resolvers;
