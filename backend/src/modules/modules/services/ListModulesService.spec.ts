import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '../repositories/drafts/DraftModulesRepository';

import ListModulesService from './ListModulesService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;

let listModules: ListModulesService;

describe('ListModules', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    listModules = new ListModulesService(
      draftModulesRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the modules', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const firstModule = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
      order: 1,
    });

    const secondModule = await draftModulesRepository.create({
      name: 'Module 02',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
      order: 2,
    });

    await listModules.execute(user.id);

    const modules = await listModules.execute(user.id);

    expect(modules).toEqual([firstModule, secondModule]);
  });
});
