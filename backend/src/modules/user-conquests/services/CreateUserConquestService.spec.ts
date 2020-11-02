import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftConquestsRepository from '@modules/conquests/repositories/drafts/DraftConquestsRepository';
import DraftUserConquestsRepository from '../repositories/drafts/DraftUserConquestsRepository';

import CreateUserConquestService from './CreateUserConquestService';

let draftUsersRepository: DraftUsersRepository;
let draftConquestsRepository: DraftConquestsRepository;
let draftUserConquestsRepository: DraftUserConquestsRepository;

let createUserConquest: CreateUserConquestService;

describe('CreateUserConquest', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftConquestsRepository = new DraftConquestsRepository();
    draftUserConquestsRepository = new DraftUserConquestsRepository();

    createUserConquest = new CreateUserConquestService(
      draftConquestsRepository,
      draftUserConquestsRepository,
    );
  });

  it('should be able to create a new user conquest', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
    });

    const userConquest = await createUserConquest.execute({
      user_id: user.id,
      conquest_id: conquest.id,
    });

    expect(userConquest).toHaveProperty('id');
  });

  it('should not be able to create a new user conquest with a non existing conquest', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserConquest.execute({
        user_id: user.id,
        conquest_id: 'non existing conquest id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user conquest in the same conquest of the same user', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
    });

    await createUserConquest.execute({
      user_id: user.id,
      conquest_id: conquest.id,
    });

    await expect(
      createUserConquest.execute({
        user_id: user.id,
        conquest_id: conquest.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
