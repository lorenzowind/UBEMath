import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '../repositories/drafts/DraftSubModulesRepository';

import DeleteSubModuleService from './DeleteSubModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;

let deleteSubModule: DeleteSubModuleService;

describe('DeleteSubModule', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteSubModule = new DeleteSubModuleService(
      draftSubModulesRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing sub-module', async () => {
    await expect(
      deleteSubModule.execute('Non existing sub-module id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a sub-module', async () => {
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

    await deleteSubModule.execute(subModule.id);

    expect(await draftSubModulesRepository.findById(subModule.id)).toBe(
      undefined,
    );
  });
});
