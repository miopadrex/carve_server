import { prisma, User } from "../../generated/prisma-client";

const resolvers = {
  Tattoo: {
    favs: ({ id }) => prisma.tattoo({ id }).favs(),
    reviews: ({ id }) => prisma.tattoo({ id }).reviews(),
    writeUser: ({ id }) => prisma.tattoo({ id }).writeUser(),
    images: ({ id }) => prisma.tattoo({ id }).images(),
    reservations: ({ id }) => prisma.tattoo({ id }).reservations(),
    isFav: (parent, _, { request }) => {
      const user: User = request.user;
      const { id } = parent;
      return prisma.$exists.fav({
        AND: [{ writeUser: { id: user.id } }, { tattoo: { id } }]
      });
    },
    favsCount: parent =>
      prisma
        .favsConnection({ where: { tattoo: { id: parent.id } } })
        .aggregate()
        .count(),
    reviewsCount: parent =>
      prisma
        .reviewsConnection({ where: { tattoo: { id: parent.id } } })
        .aggregate()
        .count(),
    reservationCount: parent =>
      prisma
        .reservationsConnection({ where: { tattooist: { id: parent.id } } })
        .aggregate()
        .count()
  }
};

export default resolvers;
