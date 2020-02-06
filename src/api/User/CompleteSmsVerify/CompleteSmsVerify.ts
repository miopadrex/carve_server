import { prisma, User } from "../../../generated/prisma-client";
import { CompleteSmsVerifyMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    CompleteSmsVerify: async (
      _,
      args: CompleteSmsVerifyMutationArgs,
      { request }
    ) => {
      const user: User = request.user;
      const { phoneNumber, key } = args;
      try {
        const verification = await prisma.verification({
          payload: phoneNumber
        });
        console.log(verification);
        if (verification?.key === key) {
          await prisma.updateUser({
            where: { id: user.id },
            data: { phoneVerfied: true }
          });
          await prisma.updateVerification({
            where: { id: verification.id },
            data: { verified: true }
          });
          return {
            ok: true,
            status: "번호인증이 성공적으로 완료되었습니다"
          };
        } else {
          return {
            ok: false,
            status: "인증키가 틀렸습니다. 확인한뒤에 다시 시도해주세요."
          };
        }
      } catch (e) {
        return {
          ok: false,
          status: e
        };
      }
    }
  }
};
export default resolvers;
