import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '../repositories/drafts/DraftUsersRepository';

import DeleteUserService from './DeleteUserService';

let draftUsersRepository: DraftUsersRepository;

let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();

    deleteUser = new DeleteUserService(draftUsersRepository);
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(
      deleteUser.execute('Non existing user id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete an user', async () => {
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

    await deleteUser.execute(user.id);

    expect(await draftUsersRepository.findById(user.id)).toBe(undefined);
  });
});
