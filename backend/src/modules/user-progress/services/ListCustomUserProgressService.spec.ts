import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftUserProgressRepository from '../repositories/drafts/DraftUserProgressRepository';

import ListCustomUserProgressService from './ListCustomUserProgressService';

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftUserProgressRepository: DraftUserProgressRepository;

let listCustomUserProgress: ListCustomUserProgressService;

describe('ListUserProgress', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftUserProgressRepository = new DraftUserProgressRepository();

    listCustomUserProgress = new ListCustomUserProgressService(
      draftModulesRepository,
      draftSubModulesRepository,
      draftUserProgressRepository,
    );
  });

  it('should be able to list the user progress', async () => {
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

    const secondSubModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 2,
    });

    await draftUserProgressRepository.create({
      user_id: user.id,
      sub_module_id: firstSubModule.id,
    });

    await draftUserProgressRepository.create({
      user_id: user.id,
      sub_module_id: secondSubModule.id,
    });

    const userProgress = await listCustomUserProgress.execute(user.id);

    expect(userProgress).toEqual([
      {
        user_id: user.id,
        module_id: module.id,
        completed_sub_modules_quantity: 2,
        sub_modules_quantity: 2,
      },
    ]);
  });
});
