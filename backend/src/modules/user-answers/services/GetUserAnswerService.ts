import { injectable, inject } from 'tsyringe';

import UserAnswer from '../infra/typeorm/schemas/UserAnswer';

import IUserAnswersRepository from '../repositories/IUserAnswersRepository';

@injectable()
class GetUserAnswerService {
  constructor(
    @inject('UserAnswersRepository')
    private userAnswersRepository: IUserAnswersRepository,
  ) {}

  public async execute(
    user_id: string,
    question_id: string,
  ): Promise<UserAnswer | undefined> {
    const userAnswer = await this.userAnswersRepository.findByUserAndQuestionId(
      user_id,
      question_id,
    );

    return userAnswer;
  }
}

export default GetUserAnswerService;
