import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import UserProgressController from '../controllers/UserProgressController';

const userProgressRouter = Router();

const userProgressController = new UserProgressController();

userProgressRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      sub_module_id: Joi.string().uuid().required(),
    },
  }),
  userProgressController.create,
);

userProgressRouter.delete(
  '/:id',
  ensureAuthenticated,
  userProgressController.delete,
);

userProgressRouter.get(
  '/:module_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      module_id: Joi.string().uuid().required(),
    },
  }),
  userProgressController.show,
);

userProgressRouter.get('/', ensureAuthenticated, userProgressController.custom);

export default userProgressRouter;
