import { buildSchema } from 'type-graphql';
import { LoginResolver, UserResolver } from './modules/user/resolver';
import { authChecker } from './auth-checker';

export const createSchema = () => {
  return buildSchema({
    resolvers: [UserResolver, LoginResolver],
    authChecker: authChecker,
    authMode: 'null',
  });
};
