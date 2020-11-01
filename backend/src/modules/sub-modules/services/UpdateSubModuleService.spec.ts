import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '../repositories/drafts/DraftSubModulesRepository';

import UpdateSubModuleService from './UpdateSubModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;

let updateSubModule: UpdateSubModuleService;

describe('UpdateSubModule', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateSubModule = new UpdateSubModuleService(
      draftModulesRepository,
      draftSubModulesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update and validate the sub-module', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    const firstSubModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module II description',
      order: 2,
      content_url: 'Sub-module II content URL',
    });

    const updatedSubModule = await updateSubModule.execute({
      id: firstSubModule.id,
      module_id: module.id,
      name: 'New Sub-module description',
      order: 1,
      content_url: 'New Sub-module content URL',
    });

    expect(updatedSubModule.name).toBe('New Sub-module description');
    expect(updatedSubModule.content_url).toBe('New Sub-module content URL');
  });

  it('should not be able to update the sub-module with the same order number of another', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    const firstSubModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module II description',
      order: 2,
      content_url: 'Sub-module II content URL',
    });

    await expect(
      updateSubModule.execute({
        id: firstSubModule.id,
        module_id: module.id,
        name: 'New Sub-module description',
        order: 2,
        content_url: 'New Sub-module content URL',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update from a non existing sub-module', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    await expect(
      updateSubModule.execute({
        id: 'non existing sub-module id',
        module_id: module.id,
        name: 'Sub-module description',
        order: 1,
        content_url: 'Sub-module content URL',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the sub-module from a non existing module', async () => {
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
      updateSubModule.execute({
        id: subModule.id,
        module_id: 'non existing module id',
        name: 'Sub-module description',
        order: 1,
        content_url: 'Sub-module content URL',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
