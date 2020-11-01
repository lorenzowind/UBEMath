import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '../repositories/drafts/DraftModulesRepository';

import DeleteModuleService from './DeleteModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;

let deleteModule: DeleteModuleService;

describe('DeleteModule', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteModule = new DeleteModuleService(
      draftModulesRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing module', async () => {
    await expect(
      deleteModule.execute('Non existing module id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a module', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    await deleteModule.execute(module.id);

    expect(await draftModulesRepository.findById(module.id)).toBe(undefined);
  });
});
