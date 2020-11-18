import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftMaterialsRepository from '@modules/materials/repositories/drafts/DraftMaterialsRepository';
import DraftSubModulesRepository from '../repositories/drafts/DraftSubModulesRepository';

import ListFilteredSubModulesService from './ListFilteredSubModulesService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftMaterialsRepository: DraftMaterialsRepository;
let draftSubModulesRepository: DraftSubModulesRepository;

let listFilteredSubModules: ListFilteredSubModulesService;

describe('ListFilteredSubModules', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftMaterialsRepository = new DraftMaterialsRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listFilteredSubModules = new ListFilteredSubModulesService(
      draftModulesRepository,
      draftMaterialsRepository,
      draftSubModulesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the filtered sub-modules', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

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

    const firstSubModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
    });

    const firstSubModuleMaterial = await draftMaterialsRepository.create({
      sub_module_id: firstSubModule.id,
      order: 1,
      image_url: 'Sub-module image URL',
    });

    const secondSubModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module II description',
      order: 2,
    });

    await listFilteredSubModules.execute(user.id, module.id);

    const subModules = await listFilteredSubModules.execute(user.id, module.id);

    expect(subModules).toEqual([
      { ...firstSubModule, content: [firstSubModuleMaterial] },
      { ...secondSubModule, content: [] },
    ]);
  });

  it('should not be able to list the filtered sub-modules from a non existing module', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      listFilteredSubModules.execute(user.id, 'non existing module id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
