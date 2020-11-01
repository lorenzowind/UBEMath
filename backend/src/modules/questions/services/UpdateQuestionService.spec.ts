import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import UpdateQuestionService from './UpdateQuestionService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;

let updateQuestion: UpdateQuestionService;

describe('UpdateQuestion', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateQuestion = new UpdateQuestionService(
      draftSubModulesRepository,
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the question', async () => {
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

    const updatedQuestion = await updateQuestion.execute({
      id: question.id,
      sub_module_id: subModule.id,
      statement: 'New Question Statement',
      right_letter: 'B',
    });

    expect(updatedQuestion.statement).toBe('New Question Statement');
    expect(updatedQuestion.right_letter).toBe('B');
  });

  it('should not be able to update from a non existing question', async () => {
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

    await expect(
      updateQuestion.execute({
        id: 'non existing question id',
        sub_module_id: subModule.id,
        statement: 'New Question Statement',
        right_letter: 'B',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the question from a non existing sub-module', async () => {
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

    await expect(
      updateQuestion.execute({
        id: question.id,
        sub_module_id: 'non existing sub-module id',
        statement: 'New Question Statement',
        right_letter: 'B',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
