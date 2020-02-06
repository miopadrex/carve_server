import { prisma } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  Review: {
    images: ({ id }) => prisma.review({ id }).images(),
    writeUser: ({ id }) => prisma.review({ id }).writeUser(),
    tattoo: ({ id }) => prisma.review({ id }).tattoo(),
    tattooist: ({ id }) => prisma.review({ id }).tattooist()
  }
};

export default resolvers;
