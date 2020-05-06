import { buildSchema } from 'type-graphql';
import { LoginResolver, UserResolver } from './modules/user/user.resolver';
import { authChecker } from './auth-checker';
import { PostResolver } from './modules/post/post.resolver';

export const createSchema = () => {
  return buildSchema({
    resolvers: [UserResolver, LoginResolver, PostResolver],
    authChecker: authChecker,
    authMode: 'null',
  });
};
