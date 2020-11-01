import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Question from '../infra/typeorm/entities/Question';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
class ListFilteredQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    sub_module_id: string,
  ): Promise<Question[]> {
    let questions = await this.cacheProvider.recover<Question[]>(
      `questions-list:${sub_module_id}:${user_id}`,
    );

    if (!questions) {
      questions = await this.questionsRepository.findAllFilteredQuestions(
        sub_module_id,
      );

      await this.cacheProvider.save(
        `questions-list:${sub_module_id}:${user_id}`,
        questions,
      );
    }

    return questions;
  }
}

export default ListFilteredQuestionsService;
