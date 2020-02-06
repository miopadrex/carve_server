import { prisma } from "../../../generated/prisma-client";
import { TextSearchTattooistQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    TextSearchTattooist: async (_, args: TextSearchTattooistQueryArgs) => {
      const { term } = args;
      try {
        const tattooist = await prisma.users({
          where: {
            OR: [
              { name_contains: term },
              { storeName_contains: term },
              { kakaoPlusId: term },
              { location: term }
            ]
          }
        });
        return {
          ok: true,
          status: "타투이스트 검색결과를 성공적으로 불러왔습니다.",
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
