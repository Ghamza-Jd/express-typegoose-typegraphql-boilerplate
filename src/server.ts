import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/resolver';

export default async function server() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  apolloServer.applyMiddleware({ app });

  return app;
}
