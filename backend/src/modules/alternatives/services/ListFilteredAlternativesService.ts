import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAlternativesRepository from '../repositories/IAlternativesRepository';

import Alternative from '../infra/typeorm/entities/Alternative';

@injectable()
class ListFilteredAlternativesService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    question_id: string,
  ): Promise<Alternative[]> {
    const checkQuestionExists = await this.questionsRepository.findById(
      question_id,
    );

    if (!checkQuestionExists) {
      throw new AppError('Question not found.');
    }

    let alternatives = await this.cacheProvider.recover<Alternative[]>(
      `alternatives-list:${question_id}:${user_id}`,
    );

    if (!alternatives) {
      alternatives = await this.alternativesRepository.findAllFilteredAlternatives(
        question_id,
      );

      await this.cacheProvider.save(
        `alternatives-list:${question_id}:${user_id}`,
        alternatives,
      );
    }

    return alternatives;
  }
}

export default ListFilteredAlternativesService;
