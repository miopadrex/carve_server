import { prisma } from "../../../generated/prisma-client";
import { SocialSignUpMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";

const resolvers: Resolvers = {
  Mutation: {
    SocialSignUp: async (_, args: SocialSignUpMutationArgs) => {
      const {
        email,
        name,
        kakaoAuthId,
        gender,
        emailVerfied,
        phoneNumber,
        avatar
      } = args;
      try {
        const newUser = await prisma.createUser({
          email,
          name,
          kakaoAuthId,
          gender,
          emailVerfied,
          phoneNumber,
          avatar
        });
        const token = createJwt(newUser.id);
        return {
          ok: true,
          status: "회원가입에 성공하였습니다.",
          token,
          user: newUser
        };
      } catch (e) {
        return {
          ok: false,
          status: e,
          token: null,
          user: null
        };
      }
    }
  }
};
export default resolvers;
