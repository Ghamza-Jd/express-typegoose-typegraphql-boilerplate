import { Request, Response } from 'express';
import User from './modules/user/User';

export default class Context {
  req!: Request;
  res!: Response;
  user?: User;
  token?: string;
}
