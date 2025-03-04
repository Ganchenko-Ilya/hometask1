import { Request, Response } from 'express';
import { DbType, ErrorsMessageType, ReqPostType } from '../db/types';
import { isCreateVideoRequestValid } from '../utils/validateFuncs';
import { addVideo, clearErrorsMessage, getErrors } from '../db/db';

export const postVideosController = (
  req: Request<unknown, unknown, ReqPostType>,
  res: Response<DbType | ErrorsMessageType>,
) => {
  const { author, title, availableResolutions } = req.body;

  const isRequestBodyValidate = isCreateVideoRequestValid(title, author, availableResolutions);

  if (isRequestBodyValidate) {
    const newVideo = addVideo(req.body);
    res.status(201).send(newVideo);
  } else {
    res.status(400).send(getErrors());
    clearErrorsMessage();
  }
};
