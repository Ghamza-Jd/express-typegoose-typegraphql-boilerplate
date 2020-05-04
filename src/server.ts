import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker } from './auth-checker';

import { LoginResolver, UserResolver } from './modules/user/resolver';
import { gqlogger } from './middlewares/gqlogger';

export default async function server() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, LoginResolver],
    authChecker: authChecker,
    authMode: 'null',
  });

  app.use(gqlogger());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  return app;
}
