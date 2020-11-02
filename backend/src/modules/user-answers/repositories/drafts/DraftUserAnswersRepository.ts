import { ObjectID } from 'mongodb';

import IUserAnswersRepository from '@modules/user-answers/repositories/IUserAnswersRepository';

import ICreateUserAnswerDTO from '@modules/user-answers/dtos/ICreateUserAnswerDTO';

import UserAnswer from '../../infra/typeorm/schemas/UserAnswer';

export default class DraftUserAnswersRepository
  implements IUserAnswersRepository {
  private userAnswers: UserAnswer[] = [];

  public async findAllFilteredUserAnswers(
    question_id: string,
  ): Promise<UserAnswer[]> {
    const findUserAnswers = this.userAnswers.filter(
      findUserAnswer => findUserAnswer.question_id === question_id,
    );

    return findUserAnswers;
  }

  public async findById(id: string): Promise<UserAnswer | undefined> {
    const userAnswer = this.userAnswers.find(
      findUserAnswer => findUserAnswer.id === id,
    );

    return userAnswer;
  }

  public async create({
    answer_letter,
    question_id,
  }: ICreateUserAnswerDTO): Promise<UserAnswer> {
    const userAnswer = new UserAnswer();

    Object.assign(userAnswer, {
      id: new ObjectID(),
      answer_letter,
      question_id,
    });

    this.userAnswers.push(userAnswer);

    return userAnswer;
  }

  public async save(userAnswer: UserAnswer): Promise<UserAnswer> {
    const findIndex = this.userAnswers.findIndex(
      findUserAnswer => findUserAnswer.id === userAnswer.id,
    );

    this.userAnswers[findIndex] = userAnswer;

    return userAnswer;
  }

  public async remove(userAnswer: UserAnswer): Promise<void> {
    const findIndex = this.userAnswers.findIndex(
      findUserAnswer => findUserAnswer.id === userAnswer.id,
    );

    this.userAnswers.splice(findIndex, 1);
  }
}
