import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserProgressRepository from '../repositories/IUserProgressRepository';

@injectable()
class DeleteUserProgressService {
  constructor(
    @inject('UserProgressRepository')
    private userProgressRepository: IUserProgressRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userProgress = await this.userProgressRepository.findById(id);

    if (!userProgress) {
      throw new AppError('User progress not found.');
    }

    await this.userProgressRepository.remove(userProgress);
  }
}

export default DeleteUserProgressService;
