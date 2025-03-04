import { Request, Response } from 'express';
import { dbDeleteId, searchVideoId } from '../db/db';

export const deleteVideosController = (req: Request, res: Response) => {
  const id = +req.params.id;
  const video = searchVideoId(id);
  if (video) {
    dbDeleteId(id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};
