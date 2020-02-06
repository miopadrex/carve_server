import { prisma } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  User: {
    writeReviews: ({ id }) => prisma.user({ id }).writeReviews(),
    writeFavs: ({ id }) => prisma.user({ id }).writeFavs(),
    reservationsAsUser: ({ id }) => prisma.user({ id }).reservationsAsUser(),
    reservationAsUserCount: parent =>
      prisma
        .reservationsConnection({ where: { requestUser: { id: parent.id } } })
        .aggregate()
        .count(),
    writeFavsCount: parent =>
      prisma
        .favsConnection({ where: { writeUser: { id: parent.id } } })
        .aggregate()
        .count(),
    writeReviewsCount: parent =>
      prisma
        .reviewsConnection({ where: { writeUser: { id: parent.id } } })
        .aggregate()
        .count()
  }
};

export default resolvers;
