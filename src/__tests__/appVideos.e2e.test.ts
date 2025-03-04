import { DbType, ErrorsMessageType, ReqPutType } from '../db/types';

import { getDb } from '../db/db';
import { getVideoId, getVideos, postVideoTestCorrectValue, request } from './test-helpers/appVideos-test-helpers';
import {
  errorFields,
  postVideosReqCorrect,
  postVideosReqInccorect,
  putVideosReqCorrect,
  putVideosReqInccorect,
} from './variables/appVideos-test';

const putVideoTestCorrectValue = async (reqBody: ReqPutType) => {
  const videos = await getVideos();

  const video = videos.body[1];
  await request.put(`/videos/${video.id}`).send(reqBody).expect(204);

  const changeVideo = await getVideoId(video.id);
  const resVideo = changeVideo.body;
  expect(resVideo).toEqual({ ...reqBody, id: video.id, createdAt: video.createdAt });
};

describe('test path /videos', () => {
  beforeAll(async () => {
    await request.delete('/testing/all-data');
  });

  it('db should be empty ', async () => {
    await getVideos().expect(200, []);
  });

  it('post video correct', async () => {
    for (const el of postVideosReqCorrect) {
      await postVideoTestCorrectValue(el);
    }

    const videos = await getVideos();
    expect(videos.body.length).toBe(2);
    expect(getDb().length).toBe(2);
  });

  it('post video incorrect', async () => {
    const res1 = await request.post('/videos').send(postVideosReqInccorect[0]).expect(400);
    const res2 = await request.post('/videos').send(postVideosReqInccorect[1]).expect(400);
    const res3 = await request.post('/videos').send(postVideosReqInccorect[2]).expect(400);
    const res4 = await request.post('/videos').send(postVideosReqInccorect[3]).expect(400);
    const res5 = await request.post('/videos').send(postVideosReqInccorect[4]).expect(400);

    expect(res1.body.errorsMessages[0].field).toBe(errorFields.title);
    expect(res1.body.errorsMessages.length).toBe(1);
    expect(typeof res1.body.errorsMessages[0].message).toBe('string');

    expect(res2.body.errorsMessages[0].field).toBe(errorFields.title);
    expect(res2.body.errorsMessages[1].field).toBe(errorFields.author);
    expect(res2.body.errorsMessages.length).toBe(2);
    expect(typeof res2.body.errorsMessages[1].message).toBe('string');

    expect(res3.body.errorsMessages[0].field).toBe(errorFields.author);
    expect(res3.body.errorsMessages[1].field).toBe(errorFields.availableResolutions);
    expect(res3.body.errorsMessages.length).toBe(2);
    expect(typeof res3.body.errorsMessages[0].message).toBe('string');

    expect(res4.body.errorsMessages[0].field).toBe(errorFields.title);
    expect(res4.body.errorsMessages[1].field).toBe(errorFields.author);
    expect(res4.body.errorsMessages[2].field).toBe(errorFields.availableResolutions);
    expect(res4.body.errorsMessages.length).toBe(3);
    expect(typeof res4.body.errorsMessages[2].message).toBe('string');

    expect(res5.body.errorsMessages[0].field).toBe(errorFields.author);
    expect(res5.body.errorsMessages[1].field).toBe(errorFields.availableResolutions);
    expect(res5.body.errorsMessages.length).toBe(2);
    expect(typeof res5.body.errorsMessages[1].message).toBe('string');
    expect(getDb().length).toBe(2);
  });

  it('get video by Id', async () => {
    const videos: { body: DbType[] } = await getVideos();
    const id = videos.body[0].id;
    const videoById = await getVideoId(id).expect(200);

    expect(videoById.body.author).toBe(postVideosReqCorrect[0].author);
    expect(getDb().length).toBe(2);
  });
  it('get video by  incorrect Id', async () => {
    const videoById = await getVideoId(1).expect(404);

    expect(Object.keys(videoById.body).length).toBe(0);
    expect(getDb().length).toBe(2);
  });

  it('put video by Id', async () => {
    expect(getDb()[1].title).toBe(postVideosReqCorrect[1].title);

    for (const el of putVideosReqCorrect) {
      await putVideoTestCorrectValue(el);
    }

    expect(getDb()[1].title).toBe(putVideosReqCorrect[2].title);
    expect(getDb().length).toBe(2);
  });
  it('put video by incorrect Id', async () => {
    const videos = await getVideos();
    const video = await getVideoId(videos.body[1].id);

    const responses = (await Promise.all(
      putVideosReqInccorect.map(async (el: any) => {
        const res = await request.put(`/videos/${video.body.id}`).send(el).expect(400);

        return res.body;
      }),
    )) as ErrorsMessageType[];

    await request.put(`/videos/1`).send(putVideosReqCorrect[0]).expect(404);

    expect(responses[0].errorsMessages[0].field).toBe(errorFields.title);
    expect(responses[0].errorsMessages[1].field).toBe(errorFields.author);
    expect(responses[0].errorsMessages[2].field).toBe(errorFields.availableResolutions);
    expect(responses[0].errorsMessages[3].field).toBe(errorFields.publicationDate);
    const isMessages0 = responses[0].errorsMessages.map((el: any) => el.message);
    expect(isMessages0.length).toBe(4);

    expect(responses[1].errorsMessages[0].field).toBe(errorFields.title);
    expect(responses[1].errorsMessages[1].field).toBe(errorFields.author);
    expect(responses[1].errorsMessages[2].field).toBe(errorFields.availableResolutions);
    expect(responses[1].errorsMessages[3].field).toBe(errorFields.canBeDownloaded);
    expect(responses[1].errorsMessages[4].field).toBe(errorFields.publicationDate);
    const isMessages1 = responses[1].errorsMessages.map((el: any) => el.message);
    expect(isMessages1.length).toBe(5);

    expect(responses[2].errorsMessages[0].field).toBe(errorFields.title);
    expect(responses[2].errorsMessages[1].field).toBe(errorFields.author);
    expect(responses[2].errorsMessages[2].field).toBe(errorFields.availableResolutions);
    expect(responses[2].errorsMessages[3].field).toBe(errorFields.minAgeRestriction);
    const isMessages2 = responses[2].errorsMessages.map((el: any) => el.message);
    expect(isMessages2.length).toBe(4);

    expect(responses[3].errorsMessages[0].field).toBe(errorFields.minAgeRestriction);
    expect(responses[3].errorsMessages[1].field).toBe(errorFields.canBeDownloaded);
    expect(responses[3].errorsMessages[2].field).toBe(errorFields.publicationDate);
    const isMessages3 = responses[3].errorsMessages.map((el: any) => el.message);
    expect(isMessages3.length).toBe(3);
  });
  it('delete video by Id', async () => {
    const videos = await getVideos();
    const id = videos.body[0].id;
    await request.delete(`/videos/${id}`).expect(204);
    await request.delete(`/videos/1`).expect(404);
  });
});
