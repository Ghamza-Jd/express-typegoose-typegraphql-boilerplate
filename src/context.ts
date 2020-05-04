import { Request, Response } from 'express';

export default class Context {
  req!: Request;
  res!: Response;
}
