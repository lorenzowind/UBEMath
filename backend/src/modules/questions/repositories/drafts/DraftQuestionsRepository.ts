import { v4 } from 'uuid';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';

import ICreateQuestionDTO from '@modules/questions/dtos/ICreateOrUpdateQuestionDTO';

import Question from '@modules/questions/infra/typeorm/entities/Question';

export default class DraftQuestionsRepository implements IQuestionsRepository {
  private questions: Question[] = [];

  public async findAllFilteredQuestions(
    sub_module_id: string,
  ): Promise<Question[]> {
    const findQuestions = this.questions.filter(
      findQuestion => findQuestion.sub_module_id === sub_module_id,
    );

    return findQuestions;
  }

  public async findById(id: string): Promise<Question | undefined> {
    const question = this.questions.find(
      findQuestion => findQuestion.id === id,
    );

    return question;
  }

  public async create(questionData: ICreateQuestionDTO): Promise<Question> {
    const question = new Question();

    Object.assign(question, { id: v4() }, questionData);

    this.questions.push(question);

    return question;
  }

  public async save(question: Question): Promise<Question> {
    const findIndex = this.questions.findIndex(
      findQuestion => findQuestion.id === question.id,
    );

    this.questions[findIndex] = question;

    return question;
  }

  public async remove(question: Question): Promise<void> {
    const findIndex = this.questions.findIndex(
      findQuestion => findQuestion.id === question.id,
    );

    this.questions.splice(findIndex, 1);
  }
}
