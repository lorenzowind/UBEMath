import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserConquestsRepository from '../repositories/IUserConquestsRepository';

@injectable()
class DeleteUserConquestService {
  constructor(
    @inject('UserConquestsRepository')
    private userConquestsRepository: IUserConquestsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userConquest = await this.userConquestsRepository.findById(id);

    if (!userConquest) {
      throw new AppError('User conquest not found.');
    }

    await this.userConquestsRepository.remove(userConquest);
  }
}

export default DeleteUserConquestService;
