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
      const body = `[모두의타투] 인증번호 ${key} 를 입력해주세요.`;
      try {
        const existingVerify = await prisma.verification({
          payload: phoneNumber
        });
        if (existingVerify) {
          const updateVerification = await prisma.updateVerification({
            where: { payload: phoneNumber },
            data: { key }
          });
          sendSms(updateVerification.payload, body, updateVerification.key);
        } else {
          const newVerification = await prisma.createVerification({
            payload: phoneNumber,
            target: "PHONE",
            key
          });
          sendSms(newVerification.payload, body, newVerification.key);
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
