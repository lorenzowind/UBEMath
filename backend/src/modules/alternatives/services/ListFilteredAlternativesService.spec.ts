import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftAlternativesRepository from '../repositories/drafts/DraftAlternativesRepository';

import ListFilteredAlternativesService from './ListFilteredAlternativesService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftAlternativesRepository: DraftAlternativesRepository;

let listFilteredAlternatives: ListFilteredAlternativesService;

describe('ListFilteredAlternatives', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftAlternativesRepository = new DraftAlternativesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listFilteredAlternatives = new ListFilteredAlternativesService(
      draftQuestionsRepository,
      draftAlternativesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the filtered alternatives', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    const subModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    const firstAlternative = await draftAlternativesRepository.create({
      question_id: question.id,
      letter: 'A',
      description: 'Description Alternative A',
    });

    const secondAlternative = await draftAlternativesRepository.create({
      question_id: question.id,
      letter: 'B',
      description: 'Description Alternative B',
    });

    await listFilteredAlternatives.execute(user.id, question.id);

    const filteredAlternatives = await listFilteredAlternatives.execute(
      user.id,
      question.id,
    );

    expect(filteredAlternatives).toEqual([firstAlternative, secondAlternative]);
  });

  it('should not be able to list the filtered alternatives from a non existing question', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      listFilteredAlternatives.execute(user.id, 'non existing question id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
