import { prisma } from "../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    GetFavTattooist: async (_, __, { request, isAuth }) => {
      isAuth(request);
      const { id } = request.user;
      try {
        const tattooist = await prisma.users({
          where: { favs_every: { writeUser: { id } } }
        });
        return {
          ok: true,
          status: "관심있는 타투이스트를 불러오는데 성공하였습니다.",
          tattooist
        };
      } catch (error) {
        return {
          ok: false,
          status: error,
          tattooist: null
        };
      }
    }
  }
};

export default resolvers;
