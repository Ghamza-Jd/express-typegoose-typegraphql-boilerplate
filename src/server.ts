import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './resolvers/register';

export default async function server() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  apolloServer.applyMiddleware({ app });

  return app;
}
