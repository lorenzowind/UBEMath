import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftUserProgressRepository from '@modules/user-progress/repositories/drafts/DraftUserProgressRepository';
import DraftSubModulesRepository from '../repositories/drafts/DraftSubModulesRepository';

import DeleteSubModuleService from './DeleteSubModuleService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftUserProgressRepository: DraftUserProgressRepository;
let draftSubModulesRepository: DraftSubModulesRepository;

let deleteSubModule: DeleteSubModuleService;

describe('DeleteSubModule', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftUserProgressRepository = new DraftUserProgressRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteSubModule = new DeleteSubModuleService(
      draftUserProgressRepository,
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

    const subModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    await draftUserProgressRepository.create({
      user_id: user.id,
      sub_module_id: subModule.id,
    });

    await deleteSubModule.execute(subModule.id);

    expect(await draftSubModulesRepository.findById(subModule.id)).toBe(
      undefined,
    );

    expect(
      await draftUserProgressRepository.findByUserAndSubModuleId(
        user.id,
        subModule.id,
      ),
    ).toBe(undefined);
  });
});
