import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftConquestsRepository from '@modules/conquests/repositories/drafts/DraftConquestsRepository';
import DraftUserConquestsRepository from '../repositories/drafts/DraftUserConquestsRepository';

import ListUserConquestsService from './ListUserConquestsService';

let draftUsersRepository: DraftUsersRepository;
let draftConquestsRepository: DraftConquestsRepository;
let draftUserConquestsRepository: DraftUserConquestsRepository;

let listUserConquests: ListUserConquestsService;

describe('ListUserConquests', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftConquestsRepository = new DraftConquestsRepository();
    draftUserConquestsRepository = new DraftUserConquestsRepository();

    listUserConquests = new ListUserConquestsService(
      draftUserConquestsRepository,
    );
  });

  it('should be able to list the user conquests', async () => {
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

    const firstUserConquest = await draftUserConquestsRepository.create({
      user_id: user.id,
      conquest_id: firstConquest.id,
    });

    const secondUserConquest = await draftUserConquestsRepository.create({
      user_id: user.id,
      conquest_id: secondConquest.id,
    });

    const conquests = await listUserConquests.execute(user.id);

    expect(conquests).toEqual([firstUserConquest, secondUserConquest]);
  });
});
