import { prisma, User } from "../../../generated/prisma-client";
import {
  EditTattooistProfileMutationArgs,
  EditTattooistProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    EditTattooistProfile: async (
      _,
      args: EditTattooistProfileMutationArgs,
      { request, authTattooist }
    ): Promise<EditTattooistProfileResponse> => {
      authTattooist(request);
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
            status: "타투이스트 정보수정이 완료되었습니다."
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
