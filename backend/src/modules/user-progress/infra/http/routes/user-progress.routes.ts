import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import UserProgressController from '../controllers/UserProgressController';

const userProgressRouter = Router();

const userProgressController = new UserProgressController();

userProgressRouter.post(
  '/',
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

userProgressRouter.get('/', ensureAuthenticated, userProgressController.show);

export default userProgressRouter;
