import { prisma } from "../../../generated/prisma-client";
import { GetReviewQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetReview: async (_, args: GetReviewQueryArgs) => {
      const { tattooId, tattooistId } = args;
      try {
        if (tattooId) {
          const tattooReview = await prisma.reviews({
            where: { tattoo: { id: tattooId } }
          });
          console.log(tattooReview);
          return {
            ok: true,
            status: "타투 리뷰를 성공적으로 불러왔습니다.",
            review: tattooReview
          };
        } else if (tattooistId) {
          const tattooistReview = await prisma.reviews({
            where: { tattooist: { id: tattooistId } }
          });
          return {
            ok: true,
            status: "타투이스트 리뷰를 성공적으로 불러왔습니다.",
            review: tattooistReview
          };
        } else {
          return {
            ok: false,
            status: "타투아이디 혹은 타투이스트 아이디가 없습니다.",
            review: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          status: error,
          review: null
        };
      }
    }
  }
};
export default resolvers;
