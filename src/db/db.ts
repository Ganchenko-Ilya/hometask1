import { DbType, ErrorsMessageType, ReqPostType, ReqPutType } from './types';
import { createNewDate, createNewVideo, generateUniqueId } from '../utils/libFunc';
import { Response } from 'express';

export let db: DbType[] = [];

export let errors: ErrorsMessageType = { errorsMessages: [] };

export const getDb = () => {
  return db;
};

export const searchVideoId = (id: number) => {
  return db.find((el) => el.id === id);
};
export const getVideoId = (id: number) => {};
export const addVideo = (reqBody: ReqPostType) => {
  const { availableResolutions, author, title } = reqBody;
  const newVideo = createNewVideo(title, author, availableResolutions);
  db.push(newVideo);
  return newVideo;
};

export const dbDeleteId = (id: number) => {
  const videos = db.filter((el) => el.id !== id);
  db = [...videos];
};

export const changeDb = (videoId: number, reqBody: ReqPutType) => {
  const newModel = { ...reqBody };
  db = db.map((el) => (el.id === videoId ? { ...newModel, id: el.id, createdAt: el.createdAt } : el));
};

export const getErrors = () => {
  const errorsCopy = { ...errors };
  return errorsCopy;
};

export const clearErrorsMessage = () => {
  errors.errorsMessages = [];
};
