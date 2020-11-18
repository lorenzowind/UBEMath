import { container } from 'tsyringe';

import './providers/index';
import '@modules/users/providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import LevelsRepository from '@modules/levels/infra/typeorm/repositories/LevelsRepository';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ModulesRepository from '@modules/modules/infra/typeorm/repositories/ModulesRepository';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import SubModulesRepository from '@modules/sub-modules/infra/typeorm/repositories/SubModulesRepository';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import MaterialsRepository from '@modules/materials/infra/typeorm/repositories/MaterialsRepository';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import QuestionsRepository from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';

import IAlternativesRepository from '@modules/alternatives/repositories/IAlternativesRepository';
import AlternativesRepository from '@modules/alternatives/infra/typeorm/repositories/AlternativesRepository';

import IConquestsRepository from '@modules/conquests/repositories/IConquestsRepository';
import ConquestsRepository from '@modules/conquests/infra/typeorm/repositories/ConquestsRepository';

import IUserAnswersRepository from '@modules/user-answers/repositories/IUserAnswersRepository';
import UserAnswersRepository from '@modules/user-answers/infra/typeorm/repositories/UserAnswersRepository';

import IUserConquestsRepository from '@modules/user-conquests/repositories/IUserConquestsRepository';
import UserConquestsRepository from '@modules/user-conquests/infra/typeorm/repositories/UserConquestsRepository';

import IUserProgressRepository from '@modules/user-progress/repositories/IUserProgressRepository';
import UserProgressRepository from '@modules/user-progress/infra/typeorm/repositories/UserProgressRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ILevelsRepository>(
  'LevelsRepository',
  LevelsRepository,
);

container.registerSingleton<IModulesRepository>(
  'ModulesRepository',
  ModulesRepository,
);

container.registerSingleton<ISubModulesRepository>(
  'SubModulesRepository',
  SubModulesRepository,
);

container.registerSingleton<IMaterialsRepository>(
  'MaterialsRepository',
  MaterialsRepository,
);

container.registerSingleton<IQuestionsRepository>(
  'QuestionsRepository',
  QuestionsRepository,
);

container.registerSingleton<IAlternativesRepository>(
  'AlternativesRepository',
  AlternativesRepository,
);

container.registerSingleton<IConquestsRepository>(
  'ConquestsRepository',
  ConquestsRepository,
);

container.registerSingleton<IUserAnswersRepository>(
  'UserAnswersRepository',
  UserAnswersRepository,
);

container.registerSingleton<IUserConquestsRepository>(
  'UserConquestsRepository',
  UserConquestsRepository,
);

container.registerSingleton<IUserProgressRepository>(
  'UserProgressRepository',
  UserProgressRepository,
);
