import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import ListFilteredQuestionsService from './ListFilteredQuestionsService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;

let listFilteredQuestions: ListFilteredQuestionsService;

describe('ListFilteredQuestions', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listFilteredQuestions = new ListFilteredQuestionsService(
      draftSubModulesRepository,
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the filtered questions', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
      order: 1,
    });

    const subModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    const firstQuestion = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    const secondQuestion = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement II',
      right_letter: 'A',
    });

    await listFilteredQuestions.execute(user.id, subModule.id);

    const questions = await listFilteredQuestions.execute(
      user.id,
      subModule.id,
    );

    expect(questions).toEqual([firstQuestion, secondQuestion]);
  });

  it('should not be able to list the filtered questions from a non existing sub-module', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      listFilteredQuestions.execute(user.id, 'non existing sub-module id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
