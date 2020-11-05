import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import UserAnswersController from '../controllers/UserAnswersController';

const userAnswersRouter = Router();

const userAnswersController = new UserAnswersController();

userAnswersRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      question_id: Joi.string().uuid().required(),
      answer_letter: Joi.string().required(),
    },
  }),
  userAnswersController.create,
);

userAnswersRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      answer_letter: Joi.string().required(),
    },
  }),
  userAnswersController.update,
);

userAnswersRouter.delete(
  '/:id',
  ensureAuthenticated,
  userAnswersController.delete,
);

userAnswersRouter.get(
  '/:question_id',
  ensureAuthenticated,
  userAnswersController.show,
);

export default userAnswersRouter;
