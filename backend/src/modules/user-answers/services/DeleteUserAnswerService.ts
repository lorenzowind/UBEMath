import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserAnswersRepository from '../repositories/IUserAnswersRepository';

@injectable()
class DeleteUserAnswerService {
  constructor(
    @inject('UserAnswersRepository')
    private userAnswersRepository: IUserAnswersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userAnswer = await this.userAnswersRepository.findById(id);

    if (!userAnswer) {
      throw new AppError('User answer not found.');
    }

    await this.userAnswersRepository.remove(userAnswer);
  }
}

export default DeleteUserAnswerService;
