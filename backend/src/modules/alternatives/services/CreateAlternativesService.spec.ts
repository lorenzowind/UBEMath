import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftAlternativesRepository from '../repositories/drafts/DraftAlternativesRepository';

import CreateAlternativesService from './CreateAlternativesService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftAlternativesRepository: DraftAlternativesRepository;

let createAlternatives: CreateAlternativesService;

describe('CreateAlternatives', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftAlternativesRepository = new DraftAlternativesRepository();

    draftCacheProvider = new DraftCacheProvider();

    createAlternatives = new CreateAlternativesService(
      draftQuestionsRepository,
      draftAlternativesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new alternatives set', async () => {
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
    });

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    const alternatives = await createAlternatives.execute({
      question_id: question.id,
      alternatives: [
        {
          letter: 'A',
          description: 'Description Alternative A',
        },
        {
          letter: 'B',
          description: 'Description Alternative B',
        },
        {
          letter: 'C',
          description: 'Description Alternative C',
        },
        {
          letter: 'D',
          description: 'Description Alternative D',
        },
        {
          letter: 'E',
          description: 'Description Alternative E',
        },
      ],
    });

    expect(alternatives).toHaveLength(5);
  });

  it('should not be able to create a new avaliations set an existent question', async () => {
    await expect(
      createAlternatives.execute({
        question_id: 'non existing question id',
        alternatives: [
          {
            letter: 'A',
            description: 'Description Alternative A',
          },
          {
            letter: 'B',
            description: 'Description Alternative B',
          },
          {
            letter: 'C',
            description: 'Description Alternative C',
          },
          {
            letter: 'D',
            description: 'Description Alternative D',
          },
          {
            letter: 'E',
            description: 'Description Alternative E',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
