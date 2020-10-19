import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '../repositories/drafts/DraftLevelsRepository';

import ListLevelsService from './ListLevelsService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;

let listLevels: ListLevelsService;

describe('ListLevelsService', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listLevels = new ListLevelsService(
      draftLevelsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the levels', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const firstLevel = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const secondLevel = await draftLevelsRepository.create({
      name: 'Level 02',
    });

    await listLevels.execute(user.id);

    const levels = await listLevels.execute(user.id);

    expect(levels).toEqual([firstLevel, secondLevel]);
  });
});
