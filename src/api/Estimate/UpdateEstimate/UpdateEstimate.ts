import { prisma, User } from "../../../generated/prisma-client";
import { UpdateEstimateMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    UpdateEstimate: async (
      _,
      args: UpdateEstimateMutationArgs,
      { request, isAuth }
    ) => {
      isAuth(request);
      const user: User = request.user;
      const authUser = await prisma.$exists.estimate({
        requestUser: { id: user.id }
      });
      console.log(authUser);
      const authTattoist = await prisma
        .estimate({ id: args.estimateId })
        .tattooist();
      const requested = await prisma.$exists.estimate({
        AND: [{ id: args.estimateId }, { status: "REQUESTING" }]
      });
      const sgEstimated = await prisma.sgEstimate({ id: args.sgEstimateId });
      const tattooist = await prisma
        .sgEstimate({ id: args.sgEstimateId })
        .tattooist();
      if (authUser) {
        if (requested && args.status === "ACCEPTED") {
          const acceptedEstimate = await prisma.updateEstimate({
            where: { id: args.estimateId },
            data: {
              tattooist: { connect: { id: tattooist.id } },
              status: "WORKING",
              location: sgEstimated?.location,
              price: sgEstimated?.price,
              worksTime: sgEstimated?.worksTime
            }
          });
          await prisma.updateSgEstimate({
            where: { id: args.sgEstimateId },
            data: { isSelect: true }
          });
          console.log(acceptedEstimate);
          return {
            ok: true,
            status: "견적서가 확인되었습니다",
            estimate: acceptedEstimate
          };
        } else if (args.status === "CANCELED") {
          const cancelEstimate = await prisma.updateEstimate({
            where: { id: args.estimateId },
            data: { status: args.status }
          });
          return {
            ok: true,
            status: "견적서가 취소되었습니다",
            estimate: cancelEstimate
          };
        } else {
          return {
            ok: false,
            status: "확인할 견적서가 없습니다.",
            estimate: null
          };
        }
      } else if (authTattoist) {
        if (args.status === "CANCELED") {
          const cancelEstimate = await prisma.updateEstimate({
            where: { id: args.estimateId },
            data: { status: args.status }
          });
          return {
            ok: true,
            status: "견적서가 취소되었습니다",
            estimate: cancelEstimate
          };
        } else if (args.status === "FINISHED") {
          const finishedEstimate = await prisma.updateEstimate({
            where: { id: args.estimateId },
            data: { status: args.status }
          });
          return {
            ok: true,
            status: "견적서의 모든 상태가 완료 되었습니다",
            estimate: finishedEstimate
          };
        } else {
          return {
            ok: false,
            status: "상태를 바꿀수있는 권한이없습니다",
            estimate: null
          };
        }
      } else {
        return {
          ok: false,
          status: "권한이없습니다",
          estimate: null
        };
      }
    }
  }
};
export default resolvers;
