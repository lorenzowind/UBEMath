import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AlternativesController from '../controllers/AlternativesController';
import AlternativeImageController from '../controllers/AlternativeImageController';

const modulesRouter = Router();

const upload = multer(uploadConfig.multer);

const alternativesController = new AlternativesController();
const alternativeImageController = new AlternativeImageController();

modulesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      question_id: Joi.string().uuid().required(),
      alternatives: Joi.array().items(
        Joi.object({
          letter: Joi.string().required(),
          description: Joi.string().required(),
        }),
      ),
    },
  }),
  alternativesController.create,
);

modulesRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      question_id: Joi.string().uuid().required(),
      letter: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  alternativesController.update,
);

modulesRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  alternativesController.delete,
);

modulesRouter.patch(
  '/:id/image',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  alternativeImageController.update,
);

modulesRouter.get(
  '/:question_id',
  ensureAuthenticated,
  alternativesController.show,
);

export default modulesRouter;
