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

// import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
// import QuestionsRepository from '@modules/questions/infra/typeorm/repositories/QuestionsRepository';

// import IAlternativesRepository from '@modules/alternatives/repositories/IAlternativesRepository';
// import AlternativesRepository from '@modules/alternatives/infra/typeorm/repositories/AlternativesRepository';

// import IConquestsRepository from '@modules/conquests/repositories/IConquestsRepository';
// import ConquestsRepository from '@modules/conquests/infra/typeorm/repositories/ConquestsRepository';

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

// container.registerSingleton<IQuestionsRepository>(
//   'QuestionsRepository',
//   QuestionsRepository,
// );

// container.registerSingleton<IAlternativesRepository>(
//   'AlternativesRepository',
//   AlternativesRepository,
// );

// container.registerSingleton<IConquestsRepository>(
//   'ConquestsRepository',
//   ConquestsRepository,
// );
