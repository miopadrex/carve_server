import { prisma } from "../../../generated/prisma-client";
import {
  RequestPasswordResetEmailVerifyMutationArgs,
  RequestPasswordResetEmailVerifyResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestPasswordResetEmailVerify: async (
      _,
      args: RequestPasswordResetEmailVerifyMutationArgs
    ): Promise<RequestPasswordResetEmailVerifyResponse> => {
      const { email } = args;
      try {
        const oldVerify = await prisma.verification({ payload: email });
        const key = Math.floor(Math.random() * 100000).toString();
        const user = await prisma.user({ email });
        const emailSubject = `${user?.name}님 비밀번호 리셋 인증 메일입니다.`;
        const emailBody = `링크를 클릭하시면 이메일 인증페이지로 갑니다. <a href="/${key}">이메일 인증</a>`;
        if (user) {
          if (oldVerify) {
            await prisma.updateVerification({
              where: { payload: email },
              data: { key: "" }
            });
            await prisma.updateVerification({
              where: { payload: email },
              data: { key }
            });

            await sendVerificationEmail(emailSubject, emailBody, user.email);
            return {
              ok: true,
              status: "인증번호 전송이 완료되었습니다."
            };
          } else {
            await prisma.createVerification({
              payload: email || "",
              target: "EMAIL",
              key,
              verified: false
            });
            await sendVerificationEmail(emailSubject, emailBody, user.email);
            return {
              ok: true,
              status: "인증번호 전송이 완료되었습니다."
            };
          }
        } else {
          return {
            ok: false,
            status:
              "작성하신 이메일로 가입되어있는 계정이 없습니다. 이메일을 다시 작성해주세요."
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
