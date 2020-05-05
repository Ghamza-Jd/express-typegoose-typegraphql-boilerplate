import { MiddlewareFn } from 'type-graphql';

import Context from '../context';

export const timeLogger: MiddlewareFn<Context> = async ({ context: { res } }, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsedTime = Date.now() - start;
    console.log(`elapsed time: ${elapsedTime} ms`);
  });
  return next();
};
