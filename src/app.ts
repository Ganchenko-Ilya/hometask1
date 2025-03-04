import express from 'express';

import { PATH } from './variables/appPath';
import { deleteAllVideosController } from './videos/deleteAllVideosController';
import { videosRouters } from './routers/videosRouters';

export const app = express();

app.use(express.json());

app.use(PATH.VIDEOS, videosRouters);

app.delete('/testing/all-data', deleteAllVideosController);
