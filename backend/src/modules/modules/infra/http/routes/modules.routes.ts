import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ModulesController from '../controllers/ModulesController';
import ModuleImageController from '../controllers/ModuleImageController';

const modulesRouter = Router();

const upload = multer(uploadConfig.multer);

const modulesController = new ModulesController();
const moduleImageController = new ModuleImageController();

modulesRouter.post(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      level_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      is_exercise: Joi.boolean().required(),
    },
  }),
  modulesController.create,
);

modulesRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      level_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      is_exercise: Joi.boolean().required(),
    },
  }),
  modulesController.update,
);

modulesRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  modulesController.delete,
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
  moduleImageController.update,
);

modulesRouter.get('/all', ensureAuthenticated, modulesController.show);

export default modulesRouter;
