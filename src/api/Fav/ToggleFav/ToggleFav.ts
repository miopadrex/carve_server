import { prisma, User } from "../../../generated/prisma-client";
import { ToggleFavMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    ToggleFav: async (
      _,
      args: ToggleFavMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const user: User = request.user;
      const { tattooId, tattooistId } = args;
      const tattooFilterOption = {
        AND: [{ writeUser: { id: user.id } }, { tattoo: { id: tattooId } }]
      };
      const tattooistFilterOption = {
        AND: [
          { writeUser: { id: user.id } },
          { tattooist: { id: tattooistId } }
        ]
      };
      try {
        if (tattooId) {
          const extingTattooFav = await prisma.$exists.fav(tattooFilterOption);
          if (extingTattooFav) {
            await prisma.deleteManyFavs(tattooFilterOption);
            return {
              ok: true,
              status: "관심타투 삭제를 성공적으로 완료하였습니다."
            };
          } else {
            await prisma.createFav({
              writeUser: { connect: { id: user.id } },
              tattoo: { connect: { id: tattooId } }
            });
            return {
              ok: true,
              status: "관심타투 추가를 성공적으로 완료하였습니다."
            };
          }
        } else if (tattooistId) {
          const exitingTattooistFav = await prisma.$exists.fav(
            tattooistFilterOption
          );
          if (exitingTattooistFav) {
            await prisma.deleteManyFavs(tattooistFilterOption);
            return {
              ok: true,
              status: "관심타투이스트 삭제를 완료하였습니다."
            };
          } else {
            await prisma.createFav({
              writeUser: { connect: { id: user.id } },
              tattooist: { connect: { id: tattooistId } }
            });
            return {
              ok: true,
              status: "관심타투이스트 등록을 완료하였습니다."
            };
          }
        } else {
          return {
            ok: false,
            status: "타투아이디 또는 타투이스트 아이디를 입려해야도비니다"
          };
        }
      } catch (e) {
        return {
          ok: false,
          status: e
        };
      }
    }
  }
};

export default resolvers;
