import { prisma } from "../../../generated/prisma-client";
import { GetReviewQueryArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetReview: async (_, args: GetReviewQueryArgs) => {
      const { reviewId } = args;
      try {
        const review = await prisma.review({ id: reviewId });
        return {
          ok: true,
          status: "리뷰를 성공적으로 불러왔습니다",
          review
        };
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
