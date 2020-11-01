import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import QuestionsController from '../controllers/QuestionsController';

const questionsRouter = Router();

const questionsController = new QuestionsController();

questionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      sub_module_id: Joi.string().uuid().required(),
      statement: Joi.string().required(),
      right_letter: Joi.string().required(),
    },
  }),
  questionsController.create,
);

questionsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      sub_module_id: Joi.string().uuid().required(),
      statement: Joi.string().required(),
      right_letter: Joi.string().required(),
    },
  }),
  questionsController.update,
);

questionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  questionsController.delete,
);

questionsRouter.get(
  '/:sub_module_id',
  ensureAuthenticated,
  questionsController.show,
);

export default questionsRouter;
