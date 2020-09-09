import { prisma } from "../../../generated/prisma-client";
import { GetMyTattooQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Query: {
    GetMyTattoo: async (
      _,
      args: GetMyTattooQueryArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { items, pageNumber } = args;
      const { user } = request;

      return await prisma.tattoos({
        first: items,
        skip: pageNumber,
        where: {
          writeUser: { id: user.id }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};

export default resolvers;
