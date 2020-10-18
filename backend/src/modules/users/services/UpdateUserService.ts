import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';
import IUpdateUserDTO from '../dtos/ICreateOrUpdateUserDTO';

interface IRequest extends IUpdateUserDTO {
  id: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
      throw new AppError('Email already in use.');
    }

    user.name = name;
    user.email = email;

    user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
