import { Request, Response } from 'express';
import { searchVideoId } from '../db/db';

export const getVideosIdController = (req: Request, res: Response) => {
  const id = +req.params.id;
  const video = searchVideoId(id);
  if (video) {
    res.status(200).send(video);
  } else {
    res.status(404).end();
  }
};
