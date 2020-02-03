import { prisma } from "../../../generated/prisma-client";
import {
  ResetEmailVerifyCompleteMutationArgs,
  ResetEmailVerifyCompleteResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";

const resolvers: Resolvers = {
  Mutation: {
    ResetEmailVerifyComplete: async (
      _,
      args: ResetEmailVerifyCompleteMutationArgs
    ): Promise<ResetEmailVerifyCompleteResponse> => {
      const { key, email } = args;
      try {
        const findCertification = await prisma
          .verification({ payload: email })
          .key();
        if (findCertification === key) {
          const user = await prisma.user({ email });
          const token = createJwt(user!.id);
          await prisma.deleteVerification({ payload: email });
          return {
            ok: true,
            status: "비밀번호 변경 이메일인증이 완료되었습니다.",
            token
          };
        } else {
          return {
            ok: false,
            status: "인증키가 올바르지 않습니다. 확인하시고 다시 입력해주세요.",
            token: null
          };
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
