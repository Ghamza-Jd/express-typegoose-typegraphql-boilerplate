import morgan from 'morgan';
import express from 'express';

morgan.token('graphql-query', (req) => {
  const { query } = req.body;
  return `GRAPHQL:\n${query}\b`;
});

export const gqlogger = () => {
  // Skip requests that contains IntrospectionQuery
  // IntrospectionQuery are sent to the graphql playground every interval of time
  // so we do not want to display them
  return morgan(':graphql-query', {
    skip(req: express.Request): boolean {
      const { query } = req.body;
      return !query || query.toString().includes('IntrospectionQuery');
    },
  });
};
