import { prisma } from "../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    GetFavTattoo: async (_, __, { request, isAuth }) => {
      isAuth(request);
      const { id } = request.user;
      try {
        const tattoos = await prisma.tattoos({
          where: { favs_every: { writeUser: { id } } }
        });
        return {
          ok: true,
          status: "관심있는 타투목록을 불러오는데 성공하였습니다.",
          tattoo: tattoos
        };
      } catch (error) {
        return {
          ok: false,
          status: error,
          tattoo: null
        };
      }
    }
  }
};

export default resolvers;
