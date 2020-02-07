import aligoapi from "aligoapi";

const AuthData = {
  key: process.env.ALIGO_KEY || "",
  user_id: process.env.ALIGO_ID || ""
};

// 테스트모드
// AuthData.testmode_yn = "Y";

export const sendSms = async (to: string, body: string) => {
  const req = {
    headers: ["content-type"],
    body: { sender: "07088071028", receiver: to, msg: body }
  };
  await aligoapi.send(req, AuthData);
};
