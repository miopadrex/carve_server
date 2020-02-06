import { prisma, User } from "../../generated/prisma-client";
import { Resolvers } from "../../types/resolvers";

const resolvers: Resolvers = {
  User: {
    reservationsAsTatooist: ({ id }) =>
      prisma.user({ id }).reservationsAsTatooist(),
    asReviews: ({ id }) => prisma.user({ id }).asReviews(),
    tattoos: ({ id }) => prisma.user({ id }).tattoos(),
    favs: ({ id }) => prisma.user({ id }).favs(),
    isFav: (parent, _, { request }) => {
      const user: User = request.user;
      const { id } = parent;
      return prisma.$exists.fav({
        AND: [{ writeUser: { id: user.id } }, { tattooist: { id } }]
      });
    },
    reservationsAsTatooistCount: parent =>
      prisma
        .reservationsConnection({ where: { requestUser: { id: parent.id } } })
        .aggregate()
        .count(),
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
