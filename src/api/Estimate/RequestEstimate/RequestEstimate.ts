import { prisma, User } from "../../../generated/prisma-client";
import { RequestEstimateMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    RequestEstimate: async (
      _,
      args: RequestEstimateMutationArgs,
      { request, isAuth }
    ) => {
      isAuth(request);
      const {
        images,
        size,
        part,
        requirements,
        want_Location_1_City,
        want_Location_1_Detail,
        want_Location_2_City,
        want_Location_2_Detail
      } = args;
      const user: User = request.user;
      try {
        const newRequestEstimate = await prisma.createEstimate({
          size,
          part,
          requirements,
          want_Location_1_City,
          want_Location_1_Detail,
          want_Location_2_City,
          want_Location_2_Detail,
          requestUser: { connect: { id: user.id } }
        });
        images.forEach(async image => {
          await prisma.createFile({
            url: image,
            estimate: { connect: { id: newRequestEstimate.id } }
          });
        });
        return {
          ok: true,
          status: "타투견적이 성공적으로 요청돠었습니다",
          estimate: newRequestEstimate
        };
      } catch (e) {
        return {
          ok: false,
          status: e,
          estimate: null
        };
      }
    }
  }
};

export default resolvers;
