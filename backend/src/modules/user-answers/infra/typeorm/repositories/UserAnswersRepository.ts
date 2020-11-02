import { getMongoRepository, MongoRepository } from 'typeorm';

import IUserAnswersRepository from '@modules/user-answers/repositories/IUserAnswersRepository';

import ICreateUserAnswerDTO from '@modules/user-answers/dtos/ICreateUserAnswerDTO';

import UserAnswer from '../schemas/UserAnswer';

class UserAnswersRepository implements IUserAnswersRepository {
  private ormRepository: MongoRepository<UserAnswer>;

  constructor() {
    this.ormRepository = getMongoRepository(UserAnswer, 'mongo');
  }

  public async findByUserAndQuestionId(
    user_id: string,
    question_id: string,
  ): Promise<UserAnswer | undefined> {
    const findUserAnswer = await this.ormRepository.findOne({
      where: { user_id, question_id },
    });

    return findUserAnswer;
  }

  public async findById(id: string): Promise<UserAnswer | undefined> {
    const findUserAnswer = await this.ormRepository.findOne(id);

    return findUserAnswer;
  }

  public async create({
    user_id,
    question_id,
    answer_letter,
  }: ICreateUserAnswerDTO): Promise<UserAnswer> {
    const userAnswer = this.ormRepository.create({
      user_id,
      question_id,
      answer_letter,
    });

    // Object.assign(userAnswer, { id: new ObjectID() });

    await this.ormRepository.save(userAnswer);

    return userAnswer;
  }

  public async save(userAnswer: UserAnswer): Promise<UserAnswer> {
    return this.ormRepository.save(userAnswer);
  }

  public async remove(userAnswer: UserAnswer): Promise<void> {
    await this.ormRepository.remove(userAnswer);
  }

  public async removeAllByQuestionId(question_id: string): Promise<void> {
    const findUserAnswers = await this.ormRepository.find({
      where: { question_id },
    });

    await this.ormRepository.remove(findUserAnswers);
  }
}

export default UserAnswersRepository;
