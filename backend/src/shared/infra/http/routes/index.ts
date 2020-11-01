import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import levelsRouter from '@modules/levels/infra/http/routes/levels.routes';
import modulesRouter from '@modules/modules/infra/http/routes/modules.routes';
import subModulesRouter from '@modules/sub-modules/infra/http/routes/sub-modules.routes';
import questionsRouter from '@modules/questions/infra/http/routes/questions.routes';
import alternativesRouter from '@modules/alternatives/infra/http/routes/alternatives.routes';

// import conquestsRouter from '@modules/conquests/infra/http/routes/conquests.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/levels', levelsRouter);
routes.use('/modules', modulesRouter);
routes.use('/sub-modules', subModulesRouter);
routes.use('/questions', questionsRouter);
routes.use('/alternatives', alternativesRouter);

// routes.use('/conquests', conquestsRouter);

export default routes;
