import { prisma, User } from "../../../generated/prisma-client";
import { EditSgEstimateMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EditSgEstimate: async (
      _,
      args: EditSgEstimateMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { SgEstimateId, suggestions, location, price, worksTime } = args;
      const user: User = request.user;
      const authestimate = await prisma.$exists.estimate({
        tattooist: { id: user.id }
      });
      if (authestimate) {
        try {
          const editSgEstimate = await prisma.updateSgEstimate({
            where: { id: SgEstimateId },
            data: { suggestions, location, price, worksTime }
          });
          return {
            ok: true,
            status: "견적 제안서 수정이 완료되었습니다",
            sgEstimate: editSgEstimate
          };
        } catch (e) {
          return {
            ok: false,
            status: e,
            sgEstimate: null
          };
        }
      } else {
        return {
          ok: false,
          status: "권한이 없습니다",
          sgEstimate: null
        };
      }
    }
  }
};

export default resolvers;
