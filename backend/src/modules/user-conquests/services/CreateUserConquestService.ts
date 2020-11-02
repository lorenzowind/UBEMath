import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IConquestsRepository from '@modules/conquests/repositories/IConquestsRepository';
import IUserConquestsRepository from '../repositories/IUserConquestsRepository';

import UserConquest from '../infra/typeorm/schemas/UserConquest';
import ICreateUserConquestDTO from '../dtos/ICreateUserConquestDTO';

@injectable()
class CreateUserConquestService {
  constructor(
    @inject('ConquestsRepository')
    private conquestsRepository: IConquestsRepository,

    @inject('UserConquestsRepository')
    private userConquestsRepository: IUserConquestsRepository,
  ) {}

  public async execute({
    user_id,
    conquest_id,
  }: ICreateUserConquestDTO): Promise<UserConquest> {
    const checkConquestExists = await this.conquestsRepository.findById(
      conquest_id,
    );

    if (!checkConquestExists) {
      throw new AppError('Conquest does not exists.');
    }

    const checkUserConquestExists = await this.userConquestsRepository.findByUserAndConquestId(
      user_id,
      conquest_id,
    );

    if (checkUserConquestExists) {
      throw new AppError('User conquest already exists.');
    }

    const userConquest = await this.userConquestsRepository.create({
      user_id,
      conquest_id,
    });

    return userConquest;
  }
}

export default CreateUserConquestService;
