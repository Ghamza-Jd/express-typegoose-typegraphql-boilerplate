import morgan from 'morgan';
import express, { RequestHandler } from 'express';

interface IOptions {
  /**
   * If jsonLogging is set to true the logging will be indented
   * @default false
   */
  jsonLogging?: boolean;
}

let loggingOptions: IOptions = {
  jsonLogging: false,
};

morgan.token('graphql-query', (req, res) => {
  const { query } = req.body;
  const formattedQuery = loggingOptions.jsonLogging
    ? query
    : query.toString().replace(/\n/g, '').replace(/ {2,}/g, ' ');
  return `\ngql_ogger:\nStatus: ${res.statusCode}\nQuery: ${formattedQuery}\b`;
});

export const logger = (options: IOptions): RequestHandler => {
  loggingOptions = options;
  return morgan(':graphql-query', {
    // Ignore schema pulling requests sent by graphql playground
    skip(req: express.Request): boolean {
      const { query } = req.body;
      return !query || query.toString().includes('IntrospectionQuery');
    },
  });
};
