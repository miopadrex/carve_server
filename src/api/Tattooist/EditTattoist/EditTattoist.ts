import { prisma, User } from "../../../generated/prisma-client";
import { EditTattooistMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    EditTattooist: async (
      _,
      args: EditTattooistMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const user: User = request.user;
      const authEdit = await prisma.$exists.user({
        id: user.id
      });
      if (authEdit) {
        try {
          const updateUser = await prisma.updateUser({
            where: { id: user.id },
            data: { ...args }
          });
          return {
            ok: true,
            status: "타투이스트 정보가 정상적으로 수정되었습니다.",
            tattooist: updateUser
          };
        } catch (error) {
          return {
            ok: false,
            status: error,
            tattooist: null
          };
        }
      } else {
        return {
          ok: false,
          status: "권한이없습니다",
          tattooist: null
        };
      }
    }
  }
};
export default resolvers;
