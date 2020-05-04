import { AuthChecker } from 'type-graphql';

import Context from './context';
import accessToken from './accessToken';

export const authChecker: AuthChecker<Context> = ({ context: { req, res } }, roles) => {
  const user = accessToken.validateAccessToken(req.headers.authorization);
  if (!user) {
    res.status(403);
    return false;
  }
  if (roles.length === 0) {
    return true;
  }
  return user.roles.some((role) => roles.includes(role));
};
