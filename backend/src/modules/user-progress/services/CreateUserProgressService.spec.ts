import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftUserProgressRepository from '../repositories/drafts/DraftUserProgressRepository';

import CreateUserProgressService from './CreateUserProgressService';

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftUserProgressRepository: DraftUserProgressRepository;

let createUserProgress: CreateUserProgressService;

describe('CreateUserProgress', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftUserProgressRepository = new DraftUserProgressRepository();

    createUserProgress = new CreateUserProgressService(
      draftSubModulesRepository,
      draftUserProgressRepository,
    );
  });

  it('should be able to create a new user progress', async () => {
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

    const subModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    const userProgress = await createUserProgress.execute({
      user_id: user.id,
      sub_module_id: subModule.id,
    });

    expect(userProgress).toHaveProperty('id');
  });

  it('should not be able to create a new user progress with a non existing sub-module', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserProgress.execute({
        user_id: user.id,
        sub_module_id: 'non existing sub-module id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user progress in the same sub-module of the same user', async () => {
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

    const subModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    await createUserProgress.execute({
      user_id: user.id,
      sub_module_id: subModule.id,
    });

    await expect(
      createUserProgress.execute({
        user_id: user.id,
        sub_module_id: subModule.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
