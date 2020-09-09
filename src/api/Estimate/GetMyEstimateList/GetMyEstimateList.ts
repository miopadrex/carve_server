import { prisma } from "../../../generated/prisma-client";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetMyEstimateList: async (_, __, { request, isAuth }) => {
      isAuth(request);
      const { user } = request;
      try {
        const getMyEstimateList = await prisma.estimates({
          where: { requestUser: { id: user.id } },
          orderBy: "createdAt_DESC"
        });
        return getMyEstimateList;
      } catch (e) {
        return e;
      }
    }
  }
};
export default resolvers;
