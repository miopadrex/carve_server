import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJwt from "./utils/decodeJwt";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: ({ request }) => ({ request, isAuth })
    });
    this.middlewares();
  }

  // 미들웨어 실행

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  // 토큰으로 유저를 컨테스트 유저로 교체
  private jwt = async (req, res, next) => {
    const token = await req.get("X-JWT");
    if (token) {
      const user = await decodeJwt(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

// 로그인사용자 인증 미들웨어
const isAuth = request => {
  if (!request.user) {
    throw Error("로그인 사용자가아닙니다.");
  }
  return;
};

export default new App().app;
