import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftUserProgressRepository from '../repositories/drafts/DraftUserProgressRepository';

import DeleteUserProgressService from './DeleteUserProgressService';

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftUserProgressRepository: DraftUserProgressRepository;

let deleteUserProgress: DeleteUserProgressService;

describe('DeleteUserProgress', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftUserProgressRepository = new DraftUserProgressRepository();

    deleteUserProgress = new DeleteUserProgressService(
      draftUserProgressRepository,
    );
  });

  it('should not be able to delete a non existing user progress', async () => {
    await expect(
      deleteUserProgress.execute('Non existing user progress id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an user progress', async () => {
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
    });

    const userProgress = await draftUserProgressRepository.create({
      user_id: user.id,
      sub_module_id: subModule.id,
    });

    await deleteUserProgress.execute(userProgress.id);

    expect(await draftUserProgressRepository.findById(userProgress.id)).toBe(
      undefined,
    );
  });
});
