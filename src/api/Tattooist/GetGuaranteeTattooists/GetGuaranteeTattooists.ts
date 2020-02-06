import { prisma } from "../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    GetGuaranteeTattooists: async () => {
      try {
        const tattooists = await prisma.users({
          where: {
            AND: {
              isTattooist: true,
              guarantee: true
            }
          }
        });
        return {
          ok: true,
          status: "타투이스트 목록을 불러오는데 성공하였습니다.",
          tattooists
        };
      } catch (error) {
        return {
          ok: false,
          status: error,
          tattooists: null
        };
      }
    }
  }
};

export default resolvers;
