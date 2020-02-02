import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API || "",
  domain: "sandboxea2431dc2568478ea0e560bf36fbc4a6.mailgun.org"
});

const sendEmail = (subject: string, html: string, to: string) => {
  const emailData = {
    from: "charyung01@naver.com",
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (name: string, key: string, to: any) => {
  try {
    const emailSubject = `${name}님 회원가입을 진심으로 축하합니다!`;
    const emailBody = `링크를 클릭하시면 이메일 인증페이지로 갑니다. <a href="/${key}">이메일 인증</a>`;
    sendEmail(emailSubject, emailBody, to);
  } catch (error) {
    return error;
  }
};
