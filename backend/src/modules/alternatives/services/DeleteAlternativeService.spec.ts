import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftAlternativesRepository from '../repositories/drafts/DraftAlternativesRepository';

import DeleteAlternativeService from './DeleteAlternativeService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftAlternativesRepository: DraftAlternativesRepository;

let deleteAlternative: DeleteAlternativeService;

describe('DeleteAlternative', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftAlternativesRepository = new DraftAlternativesRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteAlternative = new DeleteAlternativeService(
      draftAlternativesRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing alternative', async () => {
    await expect(
      deleteAlternative.execute('Non existing alternative id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an alternative', async () => {
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

    const alternative = await draftAlternativesRepository.create({
      question_id: question.id,
      letter: 'A',
      description: 'Description Alternative A',
    });

    await deleteAlternative.execute(alternative.id);

    expect(await draftAlternativesRepository.findById(alternative.id)).toBe(
      undefined,
    );
  });
});
