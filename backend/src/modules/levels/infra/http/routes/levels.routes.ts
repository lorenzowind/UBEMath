import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import LevelsController from '../controllers/LevelsController';

const levelsRouter = Router();

const levelsController = new LevelsController();

levelsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  levelsController.create,
);

levelsRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  levelsController.update,
);

levelsRouter.delete('/', ensureAuthenticated, levelsController.delete);

levelsRouter.get('/all', ensureAuthenticated, levelsController.show);

export default levelsRouter;
