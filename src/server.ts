import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker } from './authChecker';
import jwt from 'express-jwt';

import { UserResolver } from './modules/user/resolver';
import config from './config';

export default async function server() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: authChecker,
    authMode: 'null',
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/graphql', jwt({ secret: config.secret, credentialsRequired: false }));

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    playground: process.env.NODE_ENV !== 'production',
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  return app;
}
