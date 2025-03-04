import { Request, Response } from 'express';
import { getDb } from '../db/db';

export const getVideosController = (req: Request, res: Response) => {
  res.status(200).send(getDb());
};
