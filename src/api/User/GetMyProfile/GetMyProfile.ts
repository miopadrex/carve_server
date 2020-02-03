import { User } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: (_, __, { request, isAuth }) => {
      isAuth(request);
      const user: User = request.user;
      return user;
    }
  }
};

export default resolvers;
