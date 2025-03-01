import express, { Request, Response } from 'express';
import { DbType, ErrorsMessageType, ReqPostType, ReqPutType } from './db/types';
import { isChangeVideoRequestValid, isCreateVideoRequestValid } from './utils/validateFuncs';
import { addVideo, changeDb, clearErrorsMessage, dbDeleteId, getDb, getErrors, searchVideoId } from './db/db';
import * as core from 'express-serve-static-core';

export const app = express();

app.use(express.json());

app.get('/videos', (req: Request, res: Response) => {
  res.status(200).send(getDb());
});
app.get('/videos/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const video = searchVideoId(id);
  if (video) {
    res.status(200).send(video);
  } else {
    res.status(404).end();
  }
});
app.delete('/videos/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const video = searchVideoId(id);
  if (video) {
    dbDeleteId(id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});
app.post('/videos', (req: Request<unknown, unknown, ReqPostType>, res: Response<DbType | ErrorsMessageType>) => {
  const { author, title, availableResolutions } = req.body;

  const isRequestBodyValidate = isCreateVideoRequestValid(title, author, availableResolutions);

  if (isRequestBodyValidate) {
    const newVideo = addVideo(req.body);
    res.status(201).send(newVideo);
  } else {
    res.status(400).send(getErrors());
    clearErrorsMessage();
  }
});
app.put(
  '/videos/:id',
  (req: Request<core.ParamsDictionary, unknown, ReqPutType>, res: Response<null | ErrorsMessageType>) => {
    const id = +req.params.id;
    const isValidBodyRequest = isChangeVideoRequestValid(req.body);
    if (isValidBodyRequest) {
      const video = searchVideoId(id);
      if (video) {
        changeDb(+req.params.id, req.body);
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } else {
      res.status(400).send(getErrors());
      clearErrorsMessage();
    }
  },
);
