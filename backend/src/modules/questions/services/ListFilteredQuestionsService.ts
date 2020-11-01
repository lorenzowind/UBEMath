import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

import Question from '../infra/typeorm/entities/Question';

@injectable()
class ListFilteredQuestionsService {
  constructor(
    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    sub_module_id: string,
  ): Promise<Question[]> {
    const checkSubModuleExists = await this.subModulesRepository.findById(
      sub_module_id,
    );

    if (!checkSubModuleExists) {
      throw new AppError('Sub-module not found.');
    }

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
