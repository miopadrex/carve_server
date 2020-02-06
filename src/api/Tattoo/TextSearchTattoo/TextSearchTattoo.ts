import { prisma } from "../../../generated/prisma-client";
import { TextSearchTattooQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    TextSearchTattoo: async (_, args: TextSearchTattooQueryArgs) => {
      const { term } = args;
      try {
        const tattoos = await prisma.tattoos({
          where: {
            OR: [
              { writeUser: { location_contains: term } },
              { writeUser: { name_contains: term } },
              { writeUser: { storeName_contains: term } }
            ]
          }
        });
        return {
          ok: true,
          status: "타투검색 결과를 성공적으로 불러왔습니다.",
          tattoos
        };
      } catch (error) {
        return {
          ok: false,
          status: error,
          tattoos: null
        };
      }
    }
  }
};

export default resolvers;
