import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftConquestsRepository from '../repositories/drafts/DraftConquestsRepository';

import ListConquestsService from './ListConquestsService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftConquestsRepository: DraftConquestsRepository;

let listConquests: ListConquestsService;

describe('ListConquests', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftConquestsRepository = new DraftConquestsRepository();

    draftCacheProvider = new DraftCacheProvider();

    listConquests = new ListConquestsService(
      draftConquestsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to list all the conquests', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const firstConquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
    });

    const secondConquest = await draftConquestsRepository.create({
      name: 'Conquest name II',
      description: 'Conquest description',
    });

    const thirdConquest = await draftConquestsRepository.create({
      name: 'Conquest name III',
      description: 'Conquest description',
    });

    await listConquests.execute(user.id);

    const conquests = await listConquests.execute(user.id);

    expect(conquests).toEqual([firstConquest, secondConquest, thirdConquest]);
  });
});
