import { prisma } from "../../../generated/prisma-client";
import { RequestSmsVerifyMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { sendSms } from "../../../utils/sendSms";

const resolvers: Resolvers = {
  Mutation: {
    RequestSmsVerify: async (
      _,
      args: RequestSmsVerifyMutationArgs,
      { request, isAuth }
    ) => {
      isAuth(request);
      const { phoneNumber } = args;
      const key = Math.floor(Math.random() * 1000000).toString();
      const body = `[CARVE] 인증번호 [${key}] 를 입력해주세요.`;
      try {
        const existingVerify = await prisma.verification({
          payload: phoneNumber
        });
        if (existingVerify) {
          const updateVerification = await prisma.updateVerification({
            where: { payload: phoneNumber },
            data: { key }
          });
          await sendSms(updateVerification.payload, body);
        } else {
          const newVerification = await prisma.createVerification({
            payload: phoneNumber,
            target: "PHONE",
            key
          });
          await sendSms(newVerification.payload, body);
        }
        return {
          ok: true,
          status: "인증문자를 성공적으로 보냈습니다"
        };
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
