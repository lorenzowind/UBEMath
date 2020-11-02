import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserAnswersRepository from '../repositories/IUserAnswersRepository';

import UserAnswer from '../infra/typeorm/schemas/UserAnswer';
import IUpdateUserAnswerDTO from '../dtos/IUpdateUserAnswerDTO';

interface IRequest extends IUpdateUserAnswerDTO {
  id: string;
}

@injectable()
class UpdateUserAnswerService {
  constructor(
    @inject('UserAnswersRepository')
    private userAnswersRepository: IUserAnswersRepository,
  ) {}

  public async execute({ id, answer_letter }: IRequest): Promise<UserAnswer> {
    const userAnswer = await this.userAnswersRepository.findById(id);

    if (!userAnswer) {
      throw new AppError('User answer not found.');
    }

    userAnswer.answer_letter = answer_letter;

    return this.userAnswersRepository.save(userAnswer);
  }
}

export default UpdateUserAnswerService;
