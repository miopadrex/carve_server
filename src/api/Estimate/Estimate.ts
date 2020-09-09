import { prisma } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  Estimate: {
    images: ({ id }) => prisma.estimate({ id }).images(),
    requestUser: ({ id }) => prisma.estimate({ id }).requestUser(),
    tattooist: ({ id }) => prisma.estimate({ id }).tattooist(),
    sgEstimate: ({ id }) => prisma.estimate({ id }).sgEstimate()
  }
};

export default resolvers;
