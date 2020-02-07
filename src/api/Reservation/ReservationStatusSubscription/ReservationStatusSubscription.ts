import { prisma } from "../../../generated/prisma-client";
import { ReservationStatusSubscriptionSubscriptionArgs } from "../../../types/graph";
const resolvers = {
  Subscription: {
    ReservationStatusSubscription: {
      subscribe: async (
        _,
        args: ReservationStatusSubscriptionSubscriptionArgs
      ) => {
        const { reservationId } = args;
        const subscribe = await prisma.$subscribe
          .reservation({
            AND: [
              { mutation_in: "UPDATED" },
              {
                node: {
                  id: reservationId
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
