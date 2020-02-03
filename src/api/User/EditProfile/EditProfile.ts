import { prisma, User } from "../../../generated/prisma-client";
import {
  EditProfileMutationArgs,
  EditProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    EditProfile: async (
      _,
      args: EditProfileMutationArgs,
      { request, isAuth }
    ): Promise<EditProfileResponse> => {
      isAuth(request);
      const user: User = request.user;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { ...args }
        });
        return {
          ok: true,
          status: "회원정보 업데이트가 정상적으로 완료되었습니다."
        };
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
