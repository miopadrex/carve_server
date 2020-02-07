import { prisma } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  SgEstimate: {
    tattooist: ({ id }) => prisma.sgEstimate({ id }).tattooist()
  }
};

export default resolvers;
