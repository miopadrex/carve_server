import { prisma } from "../../../generated/prisma-client";
import { UpdateReservationStatusMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    UpdateReservationStatus: async (
      _,
      args: UpdateReservationStatusMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { reservationId, status } = args;
      try {
        if (authTattooist) {
          const updateReservation = await prisma.updateReservation({
            where: { id: reservationId },
            data: { status }
          });
          return updateReservation;
        }
        return null;
      } catch (e) {
        return null;
      }
    }
  }
};

export default resolvers;
