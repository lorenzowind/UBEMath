import AppError from '@shared/errors/AppError';

import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftAlternativesRepository from '../repositories/drafts/DraftAlternativesRepository';

import UpdateAlternativeImageService from './UpdateAlternativeImageService';

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftAlternativesRepository: DraftAlternativesRepository;

let draftStorageProvider: DraftStorageProvider;

let updateAlternativeImage: UpdateAlternativeImageService;

describe('UpdateAlternativeImage', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftAlternativesRepository = new DraftAlternativesRepository();

    draftStorageProvider = new DraftStorageProvider();

    updateAlternativeImage = new UpdateAlternativeImageService(
      draftAlternativesRepository,
      draftStorageProvider,
    );
  });

  it('should be able to update the alternative with an image', async () => {
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

    await updateAlternativeImage.execute({
      alternative_id: alternative.id,
      imageFilename: 'image.jpg',
    });

    await updateAlternativeImage.execute({
      alternative_id: alternative.id,
      imageFilename: 'image2.jpg',
    });

    expect(alternative.image).toBe('image2.jpg');
  });

  it('should not be able to update the image from non existing alternative', async () => {
    await expect(
      updateAlternativeImage.execute({
        alternative_id: 'non existing alternative id',
        imageFilename: 'image.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
