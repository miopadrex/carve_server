import { prisma } from "../../../generated/prisma-client";
import { GetEmailQueryArgs, GetEmailResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    GetEmail: async (_, args: GetEmailQueryArgs): Promise<GetEmailResponse> => {
      const { phoneNumber } = args;
      try {
        const existingUser = await prisma.user({ phoneNumber });
        const email = await prisma.user({ phoneNumber }).email();
        if (existingUser) {
          return {
            ok: true,
            status: "이메일을 불러오는 성공하였습니다.",
            email
          };
        } else {
          return {
            ok: false,
            status: "작성하신 핸드폰번호로 가입한 이메일이 없습니다",
            email: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          status: error,
          email: null
        };
      }
    }
  }
};

export default resolvers;
