import { getMongoRepository, MongoRepository } from 'typeorm';

import IUserAnswersRepository from '@modules/user-answers/repositories/IUserAnswersRepository';

import ICreateUserAnswerDTO from '@modules/user-answers/dtos/ICreateUserAnswerDTO';

import UserAnswer from '../schemas/UserAnswer';

class UserAnswersRepository implements IUserAnswersRepository {
  private ormRepository: MongoRepository<UserAnswer>;

  constructor() {
    this.ormRepository = getMongoRepository(UserAnswer, 'mongo');
  }

  public async findAllFilteredUserAnswers(
    question_id: string,
  ): Promise<UserAnswer[]> {
    const findUserAnswers = await this.ormRepository.find({
      where: { question_id },
    });

    return findUserAnswers;
  }

  public async findById(id: string): Promise<UserAnswer | undefined> {
    const findUserAnswer = await this.ormRepository.findOne(id);

    return findUserAnswer;
  }

  public async create({
    question_id,
    answer_letter,
  }: ICreateUserAnswerDTO): Promise<UserAnswer> {
    const userAnswer = this.ormRepository.create({
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
}

export default UserAnswersRepository;
