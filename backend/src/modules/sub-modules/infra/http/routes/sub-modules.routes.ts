import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import SubModulesController from '../controllers/SubModulesController';

const subModulesRouter = Router();

const subModulesController = new SubModulesController();

subModulesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      module_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      order: Joi.number().required(),
      content_url: Joi.string().required(),
    },
  }),
  subModulesController.create,
);

subModulesRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      module_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      order: Joi.number().required(),
      content_url: Joi.string().required(),
    },
  }),
  subModulesController.update,
);

subModulesRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  subModulesController.delete,
);

subModulesRouter.get(
  '/:module_id',
  ensureAuthenticated,
  subModulesController.show,
);

export default subModulesRouter;
