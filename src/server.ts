import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { authChecker } from './auth-checker';
import morgan from 'morgan';

import { LoginResolver, UserResolver } from './modules/user/resolver';

export default async function server() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [UserResolver, LoginResolver],
    authChecker: authChecker,
    authMode: 'null',
  });

  morgan.token('graphql-query', (req) => {
    const { query } = req.body;
    return `GRAPHQL:\n${query}\b`;
  });

  app.use(
    morgan(':graphql-query', {
      skip(req: express.Request): boolean {
        const { query } = req.body;
        return query?.toString().includes('IntrospectionQuery');
      },
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    playground: process.env.NODE_ENV !== 'production',
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  return app;
}
