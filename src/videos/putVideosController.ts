import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { ErrorsMessageType, ReqPutType } from '../db/types';
import { isChangeVideoRequestValid } from '../utils/validateFuncs';
import { changeDb, clearErrorsMessage, getErrors, searchVideoId } from '../db/db';

export const putVideosController = (
  req: Request<core.ParamsDictionary, unknown, ReqPutType>,
  res: Response<null | ErrorsMessageType>,
) => {
  const id = +req.params.id;
  const isValidBodyRequest = isChangeVideoRequestValid(req.body);
  if (isValidBodyRequest) {
    const video = searchVideoId(id);
    if (video) {
      changeDb(id, req.body);
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } else {
    res.status(400).send(getErrors());
    clearErrorsMessage();
  }
};
