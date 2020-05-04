import jwt from 'jsonwebtoken';

import config from './config';
import User from './modules/user/User';

export default class AccessToken {
  static generateAccessToken({ username, roles }: User): string {
    return jwt.sign({ username, roles }, config.secret);
  }

  static validateAccessToken(authHeader?: string): User | undefined {
    if (!authHeader) return undefined;
    let user: User | undefined;
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.secret, (err, res) => {
      if (err) user = undefined;
      user = res as User;
    });
    return user;
  }
}
