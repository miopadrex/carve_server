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
      const authEdit = await prisma.$exists.user({ id: user.id });
      if (authEdit) {
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
      } else {
        return {
          ok: false,
          status: "권한이 없습니다."
        };
      }
    }
  }
};
export default resolvers;
