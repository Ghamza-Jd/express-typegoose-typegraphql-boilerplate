import { Request, Response } from 'express';

export default class ContextType {
  req!: Request;
  res!: Response;
  payload?: {};
}
