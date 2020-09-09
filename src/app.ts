import cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import { authenticateJwt } from "./passport";
import schema from "./schema";
import { uploadController, uploadMiddleware } from "./utils/upload";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
      context: ({ request }) => ({ request, isAuth, authTattooist })
    });
    this.middlewares();
  }

  // 미들웨어 실행

  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.post("/api/upload", uploadMiddleware, uploadController);
    this.app.express.use(authenticateJwt);
  };
}

// 로그인사용자 인증 미들웨어
const isAuth = request => {
  if (!request.user) {
    throw Error("로그인 사용자가아닙니다.");
  }
  return;
};
// 타투이스트 인증
const authTattooist = request => {
  const {
    user: { isTattooist }
  } = request;
  if (!request.user) {
    throw Error("로그인 사용자가아닙니다.");
  } else if (!isTattooist) {
    throw Error("타투이스트가 아닙니다. 타투이스트 계정으로 전환하세요.");
  }
  return;
};

export default new App().app;
