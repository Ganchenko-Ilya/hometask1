import { ReqPostType, ReqPutType } from '../../db/types';
import { Resolutions } from '../../db/enum';

export const errorFields = {
  minAgeRestriction: 'minAgeRestriction',
  publicationDate: 'publicationDate',
  canBeDownloaded: 'canBeDownloaded',
  availableResolutions: 'availableResolutions',
  author: 'author',
  title: 'title',
};

export const postVideosReqCorrect: ReqPostType[] = [
  { title: '123', author: '111', availableResolutions: [Resolutions.P144] },
  {
    title: 'asdasd',
    author: 'asdsadasd',
    availableResolutions: [Resolutions.P144, Resolutions.P1080, Resolutions.P480],
  },
];

export const postVideosReqInccorect: any = [
  { title: 123, author: '111', availableResolutions: [Resolutions.P144] },
  {
    title: '',
    author: 1234,
    availableResolutions: [Resolutions.P144, Resolutions.P1080, Resolutions.P480],
  },
  {
    title: '12312',
    author: '123123123123123123123123123123123123',
    availableResolutions: [Resolutions.P144, Resolutions.P1080, 'P140'],
  },
  {
    title: '12312sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
    author: '',
    availableResolutions: [],
  },
  {
    title: '123',
    author: [],
    availableResolutions: 123,
  },
];

export const putVideosReqCorrect: ReqPutType[] = [
  {
    title: 'express',
    author: 'ilya',
    publicationDate: '2023-03-03T14:30:00.123Z',
    availableResolutions: [Resolutions.P480, Resolutions.P1080, Resolutions.P360],
    canBeDownloaded: true,
    minAgeRestriction: 4,
  },
  {
    title: 'js',
    author: 'Petr',
    publicationDate: '2024-03-03T14:30:00.123Z',
    availableResolutions: [Resolutions.P1080, Resolutions.P360],
    canBeDownloaded: true,
    minAgeRestriction: 1,
  },
  {
    title: 'css',
    author: 'Sergey',
    publicationDate: '2025-03-03T14:30:00.123Z',
    availableResolutions: [Resolutions.P480, Resolutions.P1080, Resolutions.P360, Resolutions.P144],
    canBeDownloaded: true,
    minAgeRestriction: 18,
  },
];

export const putVideosReqInccorect: any = [
  {
    title: 'expressasdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddssssss',
    author: '',
    publicationDate: '2023-03-0',
    availableResolutions: 123,
    canBeDownloaded: true,
    minAgeRestriction: 4,
  },
  {
    title: '',
    author: 2,
    publicationDate: 123,
    availableResolutions: [],
    canBeDownloaded: 1,
    minAgeRestriction: 1,
  },
  {
    title: 4,
    author: 'Sergeyssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
    publicationDate: '2025-03-03T14:30:00.123Z',
    availableResolutions: [Resolutions.P480, Resolutions.P1080, Resolutions.P360, 'P1200'],
    canBeDownloaded: false,
    minAgeRestriction: 0,
  },
  {
    title: '123123',
    author: 'Sergey',
    publicationDate: '',
    availableResolutions: [Resolutions.P480, Resolutions.P1080, Resolutions.P360, Resolutions.P144],
    canBeDownloaded: '',
    minAgeRestriction: 25,
  },
];
