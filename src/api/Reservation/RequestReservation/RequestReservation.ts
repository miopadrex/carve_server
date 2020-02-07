import { prisma, User } from "../../../generated/prisma-client";
import { RequestReservationMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    RequestReservation: async (
      _,
      args: RequestReservationMutationArgs,
      { request, isAuth }
    ) => {
      isAuth(request);
      const user: User = request.user;
      const { date, requirements, tattooId } = args;
      try {
        if (date && requirements) {
          const tattooist = await prisma.tattoo({ id: tattooId }).writeUser();
          const newReservation = await prisma.createReservation({
            date,
            requirements,
            tattoo: { connect: { id: tattooId } },
            requestUser: { connect: { id: user.id } },
            tattooist: { connect: { id: tattooist.id } }
          });
          console.log(newReservation);
          return {
            ok: true,
            status: "타투 예약등록이 완료되었습니다",
            reservation: newReservation
          };
        }
        return {
          ok: true,
          status: "타투 예약등록이 완료되었습니다"
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
