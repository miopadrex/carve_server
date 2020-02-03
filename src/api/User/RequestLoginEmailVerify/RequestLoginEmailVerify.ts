import { prisma, User } from "../../../generated/prisma-client";
import {
  RequestLoginEmailVerifyMutationArgs,
  RequestLoginEmailVerifyResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestLoginEmailVerify: async (
      _,
      args: RequestLoginEmailVerifyMutationArgs,
      { request, isAuth }
    ): Promise<RequestLoginEmailVerifyResponse> => {
      isAuth(request);
      const user: User = request.user;
      const key = Math.floor(Math.random() * 100000).toString();
      const emailSubject = `${user.name} 님 회원가입을 진심으로 축하합니다!`;
      const emailBody = `링크를 클릭하시면 이메일 인증페이지로 갑니다. <a href="/${key}">이메일 인증</a>`;
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
        await prisma.updateVerification({
          where: { payload: user.email },
          data: { key }
        });
        await sendVerificationEmail(emailSubject, emailBody, user.email);
        return {
          ok: true,
          status: "인증번호 전송이 완료되었습니다."
        };
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
