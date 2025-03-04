import { Resolutions } from './enum';

export type DbType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: Resolutions[];
};
export type ReqPostType = {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
};

export type ReqPutType = {
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  publicationDate: string;
  title: string;
  author: string;
  availableResolutions: Resolutions[];
};

export type ErrorsMessageType = {
  errorsMessages: { message: string; field: string }[];
};
