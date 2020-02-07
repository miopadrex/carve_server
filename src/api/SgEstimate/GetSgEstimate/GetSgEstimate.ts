import { prisma } from "../../../generated/prisma-client";
import { GetSgEstimateQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetSgEstimate: async (
      _,
      args: GetSgEstimateQueryArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { esSgtimateLId } = args;
      try {
        const sgEstimate = await prisma.sgEstimate({ id: esSgtimateLId });
        return sgEstimate;
      } catch (e) {
        return e;
      }
    }
  }
};
export default resolvers;
