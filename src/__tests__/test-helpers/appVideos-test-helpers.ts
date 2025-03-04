import { DbType, ReqPostType } from '../../db/types';

import { regDateISO } from '../../utils/libFunc';
import { agent } from 'supertest';
import { app } from '../../app';

export const request = agent(app);

export const getVideos = () => {
  return request.get('/videos');
};

export const getVideoId = (id: number) => {
  return request.get(`/videos/${id}`);
};

export const postVideoTestCorrectValue = async (reqBody: ReqPostType) => {
  const createdVideo = await request.post('/videos').send(reqBody).expect(201);
  const resBody: DbType = createdVideo.body;

  const getVideo = await getVideoId(resBody.id).expect(200, resBody);

  const createdAt = new Date(getVideo.body.createdAt);
  const date = createdAt.getUTCDate();
  const datePublication = createdAt;
  datePublication.setUTCDate(date + 1);

  const datePublicationISO = datePublication.toISOString();

  const reqFullBody: DbType = {
    ...reqBody,
    id: resBody.id,
    createdAt: resBody.createdAt,
    canBeDownloaded: resBody.canBeDownloaded,
    publicationDate: resBody.publicationDate,
    minAgeRestriction: resBody.minAgeRestriction,
  };
  expect(getVideo.body).toEqual(reqFullBody);

  expect(typeof getVideo.body.canBeDownloaded).toBe('boolean');
  expect(getVideo.body.minAgeRestriction).toBeNull();

  expect(regDateISO.test(getVideo.body.createdAt)).toBeTruthy();
  expect(regDateISO.test(getVideo.body.publicationDate)).toBeTruthy();
  expect(regDateISO.test(getVideo.body.publicationDate)).toBeTruthy();
  expect(getVideo.body.publicationDate).toBe(datePublicationISO);
};
