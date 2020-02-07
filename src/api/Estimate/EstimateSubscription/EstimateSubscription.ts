import { prisma } from "../../../generated/prisma-client";
import { EstimateSubscriptionSubscriptionArgs } from "../../../types/graph";
const resolvers = {
  Subscription: {
    EstimateSubscription: {
      subscribe: async (_, args: EstimateSubscriptionSubscriptionArgs) => {
        const { estimateId } = args;
        const subscribe = await prisma.$subscribe
          .estimate({
            AND: [
              { mutation_in: "UPDATED" },
              {
                node: {
                  id: estimateId
                }
              }
            ]
          })
          .node();
        return subscribe;
      },
      resolve: (payload, args, { context }) => {
        return payload;
      }
    }
  }
};
export default resolvers;
