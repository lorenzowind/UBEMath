import ICreateUserAnswerDTO from '../dtos/ICreateUserAnswerDTO';

import UserAnswer from '../infra/typeorm/schemas/UserAnswer';

export default interface IUserAnswersRepository {
  findByUserAndQuestionId(
    user_id: string,
    question_id: string,
  ): Promise<UserAnswer | undefined>;
  findById(id: string): Promise<UserAnswer | undefined>;
  create(data: ICreateUserAnswerDTO): Promise<UserAnswer>;
  save(userAnswer: UserAnswer): Promise<UserAnswer>;
  remove(userAnswer: UserAnswer): Promise<void>;
  removeAllByQuestionId(question_id: string): Promise<void>;
}
