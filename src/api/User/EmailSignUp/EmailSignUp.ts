import { prisma } from "../../../generated/prisma-client";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJwt from "../../../utils/createJwt";
import { passwordHashed } from "../../../utils/passwordHash";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const {
        name,
        email,
        phoneNumber,
        kakaoPlusId,
        instaId,
        avatar,
        gender
      } = args;
      try {
        const exists = await prisma.$exists.user({ email });
        if (exists) {
          return {
            ok: false,
            status: "등록된 이메일이 있습니다.",
            token: null
          };
        } else {
          const password = await passwordHashed(args.password);
          const newUser = await prisma.createUser({
            name,
            email,
            password,
            phoneNumber,
            kakaoPlusId,
            instaId,
            avatar,
            gender
          });
          const token = createJwt(newUser.id);
          const key = Math.floor(Math.random() * 100000).toString();
          const emailSubject = `${newUser.name}님 회원가입을 진심으로 축하합니다!`;
          const emailBody = `링크를 클릭하시면 이메일 인증페이지로 갑니다. <a href="/${key}">이메일 인증</a>`;
          if (newUser.email) {
            await prisma.createVerification({
              payload: newUser.email,
              target: "EMAIL",
              key,
              verified: false
            });
            sendVerificationEmail(emailSubject, emailBody, newUser.email);
          }
          return {
            ok: true,
            status: "가입완료 되었습니다.",
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          status: error,
          token: "null"
        };
      }
    }
  }
};

export default resolvers;
