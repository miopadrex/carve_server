import { prisma } from "../../../generated/prisma-client";
import { GetEstimateQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetEstimate: async (_, args: GetEstimateQueryArgs, { request, isAuth }) => {
      isAuth(request);
      const { estimateId } = args;
      try {
        const GetEstimate = await prisma.estimate({ id: estimateId });
        return GetEstimate;
      } catch (e) {
        return e;
      }
    }
  }
};
export default resolvers;
