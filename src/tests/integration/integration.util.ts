import { graphql, GraphQLSchema } from 'graphql';
import Maybe from 'graphql/tsutils/Maybe';

import { createSchema } from '../../createSchema';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const gqlCall = async ({ source, variableValues }: Options) => {
  if (!schema) schema = await createSchema();
  return graphql({
    schema,
    source,
    variableValues,
  });
};
