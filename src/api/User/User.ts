import { prisma, User } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  User: {
    writeReviews: ({ id }) => prisma.user({ id }).writeReviews(),
    writeFavs: ({ id }) => prisma.user({ id }).writeFavs(),
    reservationsAsUser: ({ id }) => prisma.user({ id }).reservationsAsUser(),
    reservationsAsTatooist: ({ id }) =>
      prisma.user({ id }).reservationsAsTatooist(),
    asReviews: ({ id }) => prisma.user({ id }).asReviews(),
    tattoos: ({ id }) => prisma.user({ id }).tattoos(),
    favs: ({ id }) => prisma.user({ id }).favs(),
    reservationAsUserCount: parent =>
      prisma
        .reservationsConnection({ where: { requestUser: { id: parent.id } } })
        .aggregate()
        .count(),
    reservationsAsTatooistCount: parent =>
      prisma
        .reservationsConnection({ where: { requestUser: { id: parent.id } } })
        .aggregate()
        .count(),
    isFav: (parent, _, { request }) => {
      const user: User = request.user;
      const { id } = parent;
      return prisma.$exists.fav({
        AND: [{ writeUser: { id: user.id } }, { tattooist: { id } }]
      });
    },
    favsCount: parent =>
      prisma
        .favsConnection({ where: { tattooist: { id: parent.id } } })
        .aggregate()
        .count(),
    asReviewCount: parent =>
      prisma
        .reviewsConnection({ where: { tattooist: { id: parent.id } } })
        .aggregate()
        .count(),
    tattooCount: parent =>
      prisma
        .tattoosConnection({ where: { writeUser: { id: parent.id } } })
        .aggregate()
        .count()
  }
};

export default resolvers;
