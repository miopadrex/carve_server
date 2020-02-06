import { prisma } from "../../../generated/prisma-client";
import { CategorySearchTattooQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    CategorySearchTattoo: async (_, args: CategorySearchTattooQueryArgs) => {
      const { term } = args;
      try {
        const tattoos = await prisma.tattoos({
          where: {
            OR: [{ genre: term }, { subject: term }, { part: term }]
          }
        });
        console.log(tattoos);
        return {
          ok: true,
          status: "검색 결과를 성공적으로 불러왔습니다.",
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
