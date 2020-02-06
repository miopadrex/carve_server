import { prisma, User } from "../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    ToggleTattooist: async (_, __, { request, isAuth }) => {
      isAuth(request);
      const user: User = request.user;
      try {
        const phoneVerifed = await prisma.user({ id: user.id }).phoneVerfied();
        if (phoneVerifed) {
          await prisma.updateUser({
            where: { id: user.id },
            data: { isTattooist: true }
          });
          return {
            ok: true,
            status: "타투이스트 등록이 완료되었습니다"
          };
        } else {
          return {
            ok: false,
            status: "타투이스트 등록을하려면 번호인증이 먼저완료되야합니다."
          };
        }
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
