import { prisma } from "../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    GetGuaranteeTattoos: async () => {
      try {
        const tattoos = await prisma.tattoos({
          where: { writeUser: { guarantee: true } },
          orderBy: "favsCount_ASC"
        });
        return {
          ok: true,
          status: "보증 타투목록을 불러오는데 성공하였습니다.",
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
