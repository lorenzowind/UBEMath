import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftUserConquestsRepository from '@modules/user-conquests/repositories/drafts/DraftUserConquestsRepository';
import DraftConquestsRepository from '../repositories/drafts/DraftConquestsRepository';

import DeleteConquestService from './DeleteConquestService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftUserConquestsRepository: DraftUserConquestsRepository;
let draftConquestsRepository: DraftConquestsRepository;

let deleteConquest: DeleteConquestService;

describe('DeleteConquest', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftUserConquestsRepository = new DraftUserConquestsRepository();
    draftConquestsRepository = new DraftConquestsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteConquest = new DeleteConquestService(
      draftUserConquestsRepository,
      draftConquestsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing conquest', async () => {
    await expect(
      deleteConquest.execute('Non existing conquest id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a conquest', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
    });

    await draftUserConquestsRepository.create({
      user_id: user.id,
      conquest_id: conquest.id,
    });

    await deleteConquest.execute(conquest.id);

    expect(await draftConquestsRepository.findById(conquest.id)).toBe(
      undefined,
    );

    expect(
      await draftUserConquestsRepository.findByUserAndConquestId(
        user.id,
        conquest.id,
      ),
    ).toBe(undefined);
  });
});
