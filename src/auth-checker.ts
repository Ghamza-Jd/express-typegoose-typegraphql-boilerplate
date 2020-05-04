import { AuthChecker } from 'type-graphql';

import Context from './Context';
import accessToken from './accessToken';

export const authChecker: AuthChecker<Context> = ({ context: { user, req } }, roles) => {
  if (roles.length === 0) {
    return accessToken.validateAccessToken(req.headers.authorization);
  }

  if (!user) {
    return false;
  }

  return user.roles.some((role) => roles.includes(role));
};
