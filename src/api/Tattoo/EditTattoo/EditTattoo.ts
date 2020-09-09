import { prisma, User } from "../../../generated/prisma-client";
import { EditTattooMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    EditTattoo: async (
      _,
      args: EditTattooMutationArgs,
      { request, authTattooist }
    ) => {
      authTattooist(request);
      const {
        id,
        title,
        contents,
        price,
        genre,
        subject,
        part,
        size,
        numberOfTask,
        workTime,
        action,
        createUrl,
        deleteId
      } = args;
      const user: User = request.user;
      const tattoo = await prisma.tattoo({ id });
      const authTattoo = await prisma.$exists.tattoo({
        id,
        writeUser: { id: user.id }
      });
      try {
        if (authTattoo) {
          if (action === "EDIT") {
            deleteId?.forEach(async id => {
              await prisma.deleteFile({ id });
            });
            createUrl?.forEach(async url => {
              await prisma.createFile({
                url,
                tattoo: { connect: { id: tattoo?.id } }
              });
            });
            const updatedTattoo = await prisma.updateTattoo({
              data: {
                title,
                contents,
                price,
                genre,
                subject,
                part,
                size,
                numberOfTask,
                workTime
              },
              where: { id }
            });
            return {
              ok: true,
              status: "게시물 수정이 완료 되었습니다.",
              tattoo: updatedTattoo
            };
          } else if (action === "DELETE") {
            await prisma.deleteTattoo({ id });
            return {
              ok: true,
              status: "게시물 삭제가 완료되었습니다",
              tattoo: null
            };
          } else {
            return {
              ok: false,
              status: "게시물에 대한 액션을 선택해주세요.",
              tattoo: null
            };
          }
        } else {
          return {
            ok: false,
            status: "게시물 수정권한이 없습니다.",
            tattoo: null
          };
        }
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
