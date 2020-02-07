import { prisma } from "../../../generated/prisma-client";
import { GetReservationQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetReservation: async (
      _,
      args: GetReservationQueryArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { reservationId } = args;
      try {
        const reservation = await prisma.reservation({ id: reservationId });
        return {
          ok: true,
          status: "예약내역을 성공적으로 불러왔습니다.",
          reservation
        };
      } catch (e) {
        return {
          ok: false,
          status: e,
          reservation: null
        };
      }
    }
  }
};
export default resolvers;
