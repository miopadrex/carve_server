import { prisma, User } from "../../../generated/prisma-client";
import {
  ChangePasswordMutationArgs,
  ChangePasswordResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { passwordHashed } from "../../../utils/passwordHash";

const resolvers: Resolvers = {
  Mutation: {
    ChangePassword: async (
      _,
      args: ChangePasswordMutationArgs,
      { request, isAuth }
    ): Promise<ChangePasswordResponse> => {
      const user: User = request.user;
      isAuth(request);
      try {
        const password = await passwordHashed(args.password);
        await prisma.updateUser({
          where: { id: user.id },
          data: { password }
        });
        return {
          ok: true,
          status: "비밀번호 변경이 완료되었습니다.",
          token: null
        };
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
