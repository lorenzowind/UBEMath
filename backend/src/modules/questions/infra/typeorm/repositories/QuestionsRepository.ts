import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';

import ICreateQuestionDTO from '@modules/questions/dtos/ICreateOrUpdateQuestionDTO';

import Question from '../entities/Question';

class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor() {
    this.ormRepository = getRepository(Question);
  }

  public async findAllFilteredQuestions(
    sub_module_id: string,
  ): Promise<Question[]> {
    const findQuestions = await this.ormRepository.find({
      where: sub_module_id,
    });

    return findQuestions;
  }

  public async findById(id: string): Promise<Question | undefined> {
    const findQuestion = await this.ormRepository.findOne(id);

    return findQuestion;
  }

  public async create(questionData: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create(questionData);

    Object.assign(question, { id: v4() });

    await this.ormRepository.save(question);

    return question;
  }

  public async save(question: Question): Promise<Question> {
    return this.ormRepository.save(question);
  }

  public async remove(question: Question): Promise<void> {
    await this.ormRepository.remove(question);
  }
}

export default QuestionsRepository;
