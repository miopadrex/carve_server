import { prisma } from "../../../generated/prisma-client";
import { GetTattooistQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetTattooist: async (_, args: GetTattooistQueryArgs) => {
      const { tattooistId } = args;
      try {
        const tattooist = await prisma.user({ id: tattooistId });
        return {
          ok: true,
          status: "타투이스트를 성공적으로 불러왔습니다",
          tattooist
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
