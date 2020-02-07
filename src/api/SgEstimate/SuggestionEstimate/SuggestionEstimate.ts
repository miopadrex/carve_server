import { prisma } from "../../../generated/prisma-client";
import { SuggestionEstimateMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    SuggestionEstimate: async (
      _,
      args: SuggestionEstimateMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const tattooist = request.user;
      const { estimateId, suggestions, location, price, worksTime } = args;
      try {
        const newSgEstimate = await prisma.createSgEstimate({
          estimate: { connect: { id: estimateId } },
          suggestions,
          location,
          price,
          worksTime,
          tattooist: { connect: { id: tattooist.id } }
        });
        console.log(newSgEstimate);
        return {
          ok: true,
          status: "견적서 등록이 성공적으로 완료되었습니다",
          sgEstimate: newSgEstimate
        };
      } catch (e) {
        return {
          ok: false,
          status: e,
          sgEstimate: null
        };
      }
    }
  }
};

export default resolvers;
