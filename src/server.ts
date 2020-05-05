import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { logger } from './middlewares/gqlogger';
import { createSchema } from './createSchema';

export default async () => {
  const app = express();

  const schema = await createSchema();

  app.use(logger({ jsonLogging: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  return app;
};
