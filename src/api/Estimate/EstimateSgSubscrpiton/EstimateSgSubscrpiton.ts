import { prisma } from "../../../generated/prisma-client";
import { EstimateSgSubscrpitonSubscriptionArgs } from "../../../types/graph";
const resolvers = {
  Subscription: {
    EstimateSgSubscrpiton: {
      subscribe: async (_, args: EstimateSgSubscrpitonSubscriptionArgs) => {
        const { estimateId } = args;
        const subscribe = await prisma.$subscribe
          .sgEstimate({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  estimate: { id: estimateId }
                }
              }
            ]
          })
          .node();
        return subscribe;
      },
      resolve: (payload, args, { context }) => {
        console.log(payload);
        return payload;
      }
    }
  }
};
export default resolvers;
