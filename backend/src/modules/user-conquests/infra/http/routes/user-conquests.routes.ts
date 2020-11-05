import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import UserConquestsController from '../controllers/UserConquestsController';

const userConquestsRouter = Router();

const userConquestsController = new UserConquestsController();

userConquestsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      conquest_id: Joi.string().uuid().required(),
    },
  }),
  userConquestsController.create,
);

userConquestsRouter.delete(
  '/:id',
  ensureAuthenticated,
  userConquestsController.delete,
);

userConquestsRouter.get('/', ensureAuthenticated, userConquestsController.show);

export default userConquestsRouter;
