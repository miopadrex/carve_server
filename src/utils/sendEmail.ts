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

export const sendVerificationEmail = (
  emailSubject,
  emailBody,
  to: any | undefined
) => {
  try {
    console.log(emailSubject, emailBody, to);
    sendEmail(emailSubject, emailBody, to);
  } catch (error) {
    return error;
  }
};
