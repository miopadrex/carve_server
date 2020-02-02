import { prisma, User } from "../../../generated/prisma-client";
import { RequestEmailVerifyResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerify: async (
      _,
      __,
      { request, isAuth }
    ): Promise<RequestEmailVerifyResponse> => {
      isAuth(request);
      const user: User = request.user;
      if (user.emailVerfied) {
        return {
          ok: false,
          status: "이메일 인증을 이미 완료 하였습니다."
        };
      }
      try {
        const oldVerify = await prisma.verification({ payload: user.email });
        if (oldVerify) {
          await prisma.updateVerification({
            where: { payload: user.email },
            data: { key: "" }
          });
        }
        const key = Math.floor(Math.random() * 100000).toString();
        const newVerify = await prisma.updateVerification({
          where: { payload: user.email },
          data: { key }
        });
        return {
          ok: true,
          status: "인증번호 전송이 완료되었습니다."
        };
        await sendVerificationEmail(user.name, newVerify.key, user.email);
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
