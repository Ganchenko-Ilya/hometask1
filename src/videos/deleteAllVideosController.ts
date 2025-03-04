import { Request, Response } from 'express';
import { allDeleteDb } from '../db/db';

export const deleteAllVideosController = (req: Request, res: Response) => {
  allDeleteDb();
  res.status(204).end();
};
