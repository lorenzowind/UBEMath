import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftAlternativesRepository from '../repositories/drafts/DraftAlternativesRepository';

import UpdateAlternativeService from './UpdateAlternativeService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftAlternativesRepository: DraftAlternativesRepository;

let updateAlternative: UpdateAlternativeService;

describe('UpdateAlternative', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftAlternativesRepository = new DraftAlternativesRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateAlternative = new UpdateAlternativeService(
      draftQuestionsRepository,
      draftAlternativesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the alternative', async () => {
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

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    const alternative = await draftAlternativesRepository.create({
      question_id: question.id,
      letter: 'A',
      description: 'Description Alternative A',
    });

    const updatedAlternative = await updateAlternative.execute({
      id: alternative.id,
      question_id: question.id,
      letter: 'A',
      description: 'New Description Alternative A',
    });

    expect(updatedAlternative.description).toBe(
      'New Description Alternative A',
    );
  });

  it('should not be able to update from a non existing alternative', async () => {
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

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    await expect(
      updateAlternative.execute({
        id: 'non existing alternative id',
        question_id: question.id,
        letter: 'A',
        description: 'New Description Alternative A',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the alternative from a non existing question', async () => {
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

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    const alternative = await draftAlternativesRepository.create({
      question_id: question.id,
      letter: 'A',
      description: 'Description Alternative A',
    });

    await expect(
      updateAlternative.execute({
        id: alternative.id,
        question_id: 'non existing question id',
        letter: 'A',
        description: 'New Description Alternative A',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
