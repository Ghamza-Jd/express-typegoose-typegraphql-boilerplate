import jwt from 'jsonwebtoken';

import config from './config';

export default class AccessToken {
  static generateAccessToken(username: string) {
    return jwt.sign(username, config.secret);
  }

  static validateAccessToken(authHeader?: string) {
    if (!authHeader) return false;
    let validToken: boolean = false;
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.secret, (err, res) => {
      if (err) throw new Error();
      validToken = res !== undefined;
    });
    return validToken;
  }
}
