import bcrypt from "bcrypt";
import { User } from "../../../generated/prisma-client";
import {
  ChangePasswordConfirmMutationArgs,
  ChangePasswordConfirmResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    ChangePasswordConfirm: async (
      _,
      args: ChangePasswordConfirmMutationArgs,
      { request, isAuth }
    ): Promise<ChangePasswordConfirmResponse> => {
      isAuth(request);
      const user: User = request.user;
      try {
        const confirmPw = args.password;
        const chekedPassword = await bcrypt.compare(confirmPw, user.password!);
        if (chekedPassword) {
          return {
            ok: true,
            status: "비밀번호 인증이 완료되었습니다."
          };
        } else {
          return {
            ok: false,
            status: "입력하신 비밀번호가 올바르지 않습니다. 다시입력해주세요."
          };
        }
      } catch (error) {
        return {
          ok: false,
          status: error.message
        };
      }
    }
  }
};

export default resolvers;
