import AppError from '@shared/errors/AppError';

import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import CreateUserService from './CreateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftHashProvider: DraftHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftHashProvider = new DraftHashProvider();

    createUser = new CreateUserService(draftUsersRepository, draftHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      position: 'admin',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        position: 'admin',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
