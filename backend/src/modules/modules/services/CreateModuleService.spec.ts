import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '../repositories/drafts/DraftModulesRepository';

import CreateModuleService from './CreateModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;

let createModule: CreateModuleService;

describe('CreateModule', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    createModule = new CreateModuleService(
      draftLevelsRepository,
      draftModulesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new module', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await createModule.execute({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    expect(module).toHaveProperty('id');
  });

  it('should not be able to create a new module without an existent level', async () => {
    await expect(
      createModule.execute({
        name: 'Module 01',
        description: 'Module description',
        is_exercise: false,
        level_id: 'non existing level id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
