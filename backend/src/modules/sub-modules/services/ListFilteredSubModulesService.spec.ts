import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '../repositories/drafts/DraftSubModulesRepository';

import ListFilteredSubModulesService from './ListFilteredSubModulesService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;

let listFilteredSubModules: ListFilteredSubModulesService;

describe('ListFilteredSubModules', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listFilteredSubModules = new ListFilteredSubModulesService(
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

    const secondSubModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module II description',
      order: 2,
      content_url: 'Sub-module II content URL',
    });

    await listFilteredSubModules.execute(user.id, module.id);

    const subModules = await listFilteredSubModules.execute(user.id, module.id);

    expect(subModules).toEqual([firstSubModule, secondSubModule]);
  });
});