import { prisma, User } from "../../../generated/prisma-client";
import { CreateTattooReviewMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    CreateTattooReview: async (
      _,
      args: CreateTattooReviewMutationArgs,
      { request, isAuth }
    ) => {
      isAuth(request);
      const user: User = request.user;
      const { contents, grade, images, tattooId, tattooistId } = args;
      try {
        if (tattooId) {
          const newReview = await prisma.createReview({
            writeUser: { connect: { id: user.id } },
            tattoo: { connect: { id: tattooId } },
            contents,
            grade
          });
          images.forEach(async image => {
            await prisma.createFile({
              url: image,
              tattooReview: { connect: { id: newReview.id } }
            });
          });
          return {
            ok: true,
            status: "타투리뷰등록이 성공적으로 완료되었습니다",
            review: newReview
          };
        } else if (tattooistId) {
          const newReview = await prisma.createReview({
            writeUser: { connect: { id: user.id } },
            tattooist: { connect: { id: tattooistId } },
            contents,
            grade
          });
          images.forEach(async image => {
            await prisma.createFile({
              url: image,
              tattooReview: { connect: { id: newReview.id } }
            });
          });
          return {
            ok: true,
            status: "타투리뷰등록이 성공적으로 완료되었습니다",
            review: newReview
          };
        } else {
          return {
            ok: false,
            status: "타투아이디 혹은 타투이스트 아이디를 입력해야됩니다.",
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
