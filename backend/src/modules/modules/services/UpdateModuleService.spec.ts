import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '../repositories/drafts/DraftModulesRepository';

import UpdateModuleService from './UpdateModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;

let updateModule: UpdateModuleService;

describe('UpdateModule', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateModule = new UpdateModuleService(
      draftLevelsRepository,
      draftModulesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the module', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    const updatedModule = await updateModule.execute({
      id: module.id,
      name: 'New module 01',
      description: 'New module description',
      is_exercise: false,
      level_id: level.id,
    });

    expect(updatedModule.name).toBe('New module 01');
    expect(updatedModule.description).toBe('New module description');
  });

  it('should not be able to update from a non existing module', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    expect(
      updateModule.execute({
        id: 'non existing module',
        name: 'Module 01',
        description: 'Module description',
        is_exercise: false,
        level_id: level.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the module from a non existing level', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    expect(
      updateModule.execute({
        id: module.id,
        name: 'New module 01',
        description: 'New module description',
        is_exercise: false,
        level_id: 'non existing level',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
