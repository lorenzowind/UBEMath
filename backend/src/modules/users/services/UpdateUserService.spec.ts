import AppError from '@shared/errors/AppError';

import DraftHashProvider from '../providers/HashProvider/drafts/DraftHashProvider';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import UpdateUserService from './UpdateUserService';

let draftUsersRepository: DraftUsersRepository;

let draftHashProvider: DraftHashProvider;

let UpdateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    draftHashProvider = new DraftHashProvider();

    UpdateUser = new UpdateUserService(draftUsersRepository, draftHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await UpdateUser.execute({
      id: user.id,
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      old_password: '123456',
      new_password: '123123',
    });

    expect(updatedUser.name).toBe('John Doe II');
    expect(updatedUser.email).toBe('johndoeII@example.com');
  });

  it('should not be able to update from a non existing user', async () => {
    expect(
      UpdateUser.execute({
        id: 'non existing user',
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: '123456',
        new_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another user email', async () => {
    await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await draftUsersRepository.create({
      name: 'John Doe II',
      email: 'johndoeII@example.com',
      password: '123456',
    });

    await expect(
      UpdateUser.execute({
        id: user.id,
        name: user.name,
        email: 'johndoe@example.com',
        old_password: '123456',
        new_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await UpdateUser.execute({
      id: user.id,
      name: user.name,
      email: user.email,
      old_password: '123456',
      new_password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });
});
