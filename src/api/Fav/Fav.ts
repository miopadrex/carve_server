import { prisma } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  Fav: {
    writeUser: ({ id }) => prisma.fav({ id }).writeUser(),
    tattoo: ({ id }) => prisma.fav({ id }).tattoo(),
    tattooist: ({ id }) => prisma.fav({ id }).tattooist()
  }
};

export default resolvers;
