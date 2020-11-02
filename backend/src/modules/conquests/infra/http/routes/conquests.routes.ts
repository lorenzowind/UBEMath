import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ConquestsController from '../controllers/ConquestsController';
import ConquestImageController from '../controllers/ConquestImageController';

const conquestsRouter = Router();

const upload = multer(uploadConfig.multer);

const conquestsController = new ConquestsController();
const conquestImageController = new ConquestImageController();

conquestsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  conquestsController.create,
);

conquestsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  conquestsController.update,
);

conquestsRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  conquestsController.delete,
);

conquestsRouter.patch(
  '/:id/image',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  conquestImageController.update,
);

conquestsRouter.get('/all', ensureAuthenticated, conquestsController.show);

export default conquestsRouter;
