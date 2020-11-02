import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '../repositories/drafts/DraftSubModulesRepository';

import CreateSubModuleService from './CreateSubModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;

let createSubModule: CreateSubModuleService;

describe('CreateSubModule', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    createSubModule = new CreateSubModuleService(
      draftModulesRepository,
      draftSubModulesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create and validate a new sub-module', async () => {
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

    const firstSubModule = await createSubModule.execute({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    const secondSubModule = await createSubModule.execute({
      module_id: module.id,
      name: 'Sub-module II description',
      order: 2,
      content_url: 'Sub-module II content URL',
    });

    expect(firstSubModule).toHaveProperty('id');
    expect(secondSubModule).toHaveProperty('id');
  });

  it('should not be able to create a new sub-module with same order number of another', async () => {
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

    await createSubModule.execute({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    await expect(
      createSubModule.execute({
        module_id: module.id,
        name: 'Sub-module II description',
        order: 1,
        content_url: 'Sub-module II content URL',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new sub-module without an existent module', async () => {
    await expect(
      createSubModule.execute({
        module_id: 'non existing module id',
        name: 'Sub-module description',
        order: 1,
        content_url: 'Sub-module content URL',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
