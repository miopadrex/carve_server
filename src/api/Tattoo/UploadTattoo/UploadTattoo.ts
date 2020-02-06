import { prisma } from "../../../generated/prisma-client";
import { UploadTattooMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
const resolvers: Resolvers = {
  Mutation: {
    UploadTattoo: async (
      _,
      args: UploadTattooMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const { user } = request;
      const {
        title,
        contents,
        price,
        genre,
        subject,
        part,
        size,
        numberOfTask,
        workTime,
        sale,
        images
      } = args;
      try {
        const newTattoo = await prisma.createTattoo({
          title,
          contents,
          price,
          genre,
          subject,
          part,
          size,
          numberOfTask,
          workTime,
          sale,
          writeUser: { connect: { id: user.id } }
        });

        images.forEach(async image => {
          await prisma.createFile({
            url: image,
            tattoo: {
              connect: {
                id: newTattoo.id
              }
            }
          });
        });
        return {
          ok: true,
          status: "타투 등록을 성공적으로 완료하였습니다.",
          tattoo: newTattoo
        };
      } catch (error) {
        return {
          ok: false,
          status: error,
          tattoo: null
        };
      }
    }
  }
};

export default resolvers;
