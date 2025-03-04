import { Router } from 'express';
import { PATH } from '../variables/appPath';
import { getVideosController } from '../videos/getVideosController';
import { getVideosIdController } from '../videos/getVideosIdController';
import { deleteVideosController } from '../videos/deleteVideosController';
import { postVideosController } from '../videos/postVideosController';
import { putVideosController } from '../videos/putVideosController';

export const videosRouters = Router();

videosRouters.get('', getVideosController);
videosRouters.get(`/:id`, getVideosIdController);
videosRouters.delete(`/:id`, deleteVideosController);
videosRouters.post('', postVideosController);
videosRouters.put('/:id', putVideosController);
