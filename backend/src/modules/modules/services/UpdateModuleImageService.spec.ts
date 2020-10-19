import AppError from '@shared/errors/AppError';

import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '../repositories/drafts/DraftModulesRepository';

import UpdateModuleImageService from './UpdateModuleImageService';

let draftModulesRepository: DraftModulesRepository;
let draftLevelsRepository: DraftLevelsRepository;

let draftStorageProvider: DraftStorageProvider;

let updateModuleImage: UpdateModuleImageService;

describe('UpdateModuleImage', () => {
  beforeEach(() => {
    draftModulesRepository = new DraftModulesRepository();
    draftLevelsRepository = new DraftLevelsRepository();

    draftStorageProvider = new DraftStorageProvider();

    updateModuleImage = new UpdateModuleImageService(
      draftModulesRepository,
      draftStorageProvider,
    );
  });

  it('should be able to update the module with an image', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    await updateModuleImage.execute({
      module_id: module.id,
      imageFilename: 'avatar.jpg',
    });

    await updateModuleImage.execute({
      module_id: module.id,
      imageFilename: 'avatar2.jpg',
    });

    expect(module.image).toBe('avatar2.jpg');
  });

  it('should not be able to update the image from non existing module', async () => {
    await expect(
      updateModuleImage.execute({
        module_id: 'non existing module id',
        imageFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
