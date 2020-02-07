import { prisma } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  Reservation: {
    requestUser: ({ id }) => prisma.reservation({ id }).requestUser(),
    tattooist: ({ id }) => prisma.reservation({ id }).tattooist(),
    tattoo: ({ id }) => prisma.reservation({ id }).tattoo()
  }
};

export default resolvers;
