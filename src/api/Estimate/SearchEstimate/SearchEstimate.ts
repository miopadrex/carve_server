import { prisma } from "../../../generated/prisma-client";
import { SearchEstimateMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    SearchEstimate: async (
      _,
      args: SearchEstimateMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { term } = args;
      try {
        const estimates = await prisma.estimates({
          where: {
            OR: [
              { want_Location_1_City_contains: term },
              { want_Location_1_Detail_contains: term },
              { want_Location_2_City_contains: term },
              { want_Location_2_Detail_contains: term }
            ],
            status: "REQUESTING"
          }
        });
        console.log(estimates);
        return estimates;
      } catch (e) {
        return console.log(e);
      }
    }
  }
};
export default resolvers;
