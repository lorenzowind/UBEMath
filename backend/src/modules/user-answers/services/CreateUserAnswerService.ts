import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IUserAnswersRepository from '../repositories/IUserAnswersRepository';

import UserAnswer from '../infra/typeorm/schemas/UserAnswer';
import ICreateUserAnswerDTO from '../dtos/ICreateUserAnswerDTO';

@injectable()
class CreateUserAnswerService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('UserAnswersRepository')
    private userAnswersRepository: IUserAnswersRepository,
  ) {}

  public async execute({
    user_id,
    answer_letter,
    question_id,
  }: ICreateUserAnswerDTO): Promise<UserAnswer> {
    const checkQuestionExists = await this.questionsRepository.findById(
      question_id,
    );

    if (!checkQuestionExists) {
      throw new AppError('Question does not exists.');
    }

    const checkUserAnswerExists = await this.userAnswersRepository.findByUserAndQuestionId(
      user_id,
      question_id,
    );

    if (checkUserAnswerExists) {
      throw new AppError('User answer already exists in this question.');
    }

    const userAnswer = await this.userAnswersRepository.create({
      user_id,
      answer_letter,
      question_id,
    });

    return userAnswer;
  }
}

export default CreateUserAnswerService;
