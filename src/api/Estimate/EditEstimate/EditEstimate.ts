import { prisma, User } from "../../../generated/prisma-client";
import { EditEstimateMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EditEstimate: async (
      _,
      args: EditEstimateMutationArgs,
      { request, isAuth }
    ) => {
      isAuth(request);
      const user: User = request.user;
      const authEdit = await prisma.$exists.estimate({
        requestUser: { id: user.id }
      });
      const { estimateId, size, part, location, deleteId, createUrl } = args;
      if (authEdit) {
        try {
          deleteId.forEach(async id => await prisma.deleteFile({ id }));
          createUrl.forEach(
            async url =>
              await prisma.createFile({
                url,
                estimate: { connect: { id: estimateId } }
              })
          );
          const editEstimate = await prisma.updateEstimate({
            where: { id: estimateId },
            data: { size, part, location }
          });
          return {
            ok: true,
            status: "견적 제안서 수정이 완료되었습니다",
            EditEstimate: editEstimate
          };
        } catch (e) {
          return {
            ok: false,
            status: e,
            EditEstimate: null
          };
        }
      } else {
        return {
          ok: false,
          status: "게시물에 대한 권한이 없습니다.",
          editEstimate: null
        };
      }
    }
  }
};

export default resolvers;
