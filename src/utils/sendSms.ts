import aligoapi from "aligoapi";

const AuthData = {
  key: "hpz2ix2o44gs68n0mi4sdehjou6vpvsu",
  user_id: "afterlove80"
};

export const sendSms = (to: string, body: string, key: string) => {
  const req = {
    sender: "07088071028",
    receiver: to,
    msg: body
  };
  aligoapi.send(req, AuthData);
};
