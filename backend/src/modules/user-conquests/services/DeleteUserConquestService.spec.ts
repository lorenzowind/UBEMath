import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftConquestsRepository from '@modules/conquests/repositories/drafts/DraftConquestsRepository';
import DraftUserConquestsRepository from '../repositories/drafts/DraftUserConquestsRepository';

import DeleteUserConquestService from './DeleteUserConquestService';

let draftUsersRepository: DraftUsersRepository;
let draftConquestsRepository: DraftConquestsRepository;
let draftUserConquestsRepository: DraftUserConquestsRepository;

let deleteUserConquest: DeleteUserConquestService;

describe('DeleteUserConquest', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftConquestsRepository = new DraftConquestsRepository();
    draftUserConquestsRepository = new DraftUserConquestsRepository();

    deleteUserConquest = new DeleteUserConquestService(
      draftUserConquestsRepository,
    );
  });

  it('should not be able to delete a non existing user conquest', async () => {
    await expect(
      deleteUserConquest.execute('Non existing user conquest id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an user conquest', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    const userConquest = await draftUserConquestsRepository.create({
      user_id: user.id,
      conquest_id: conquest.id,
    });

    await deleteUserConquest.execute(userConquest.id);

    expect(await draftUserConquestsRepository.findById(userConquest.id)).toBe(
      undefined,
    );
  });
});
