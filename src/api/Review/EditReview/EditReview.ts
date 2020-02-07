import { prisma, User } from "../../../generated/prisma-client";
import { EditReviewMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EditReview: async (
      _,
      args: EditReviewMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const user: User = request.user;
      const { reviewId, contents, grade, createUrl, deleteId, action } = args;
      const authReview = await prisma.$exists.review({
        writeUser: { id: user.id }
      });
      if (authReview) {
        try {
          if (action === "EDIT") {
            deleteId?.forEach(async id => await prisma.deleteFile({ id }));
            createUrl?.forEach(
              async url =>
                await prisma.createFile({
                  url,
                  tattooReview: { connect: { id: reviewId } }
                })
            );
            const editreview = await prisma.updateReview({
              where: { id: reviewId },
              data: {
                contents,
                grade
              }
            });
            return {
              ok: true,
              status: "리뷰 수정이 완료되었습니다",
              editreview
            };
          } else if (action === "DELETE") {
            await prisma.deleteReview({ id: reviewId });
            return {
              ok: true,
              status: "리뷰삭제가 완료되었습니다",
              editreview: null
            };
          } else {
            return {
              ok: false,
              status: "게시물에 대한 액션을 선택해주세요",
              editreview: null
            };
          }
        } catch (e) {
          return {
            ok: false,
            status: e,
            editreview: null
          };
        }
      } else {
        return {
          ok: false,
          status: "권한이 없습니다",
          editreview: null
        };
      }
    }
  }
};

export default resolvers;
