import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAlternativesRepository from '../repositories/IAlternativesRepository';

import Alternative from '../infra/typeorm/entities/Alternative';
import ICreateAlternativesRequestDTO from '../dtos/ICreateAlternativesRequestDTO';

@injectable()
class CreateAlternativesService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    question_id,
    alternatives,
  }: ICreateAlternativesRequestDTO): Promise<Alternative[]> {
    const checkQuestionExists = await this.questionsRepository.findById(
      question_id,
    );

    if (!checkQuestionExists) {
      throw new AppError('Question not found.');
    }

    const createdAlternatives: Alternative[] = [];

    for (let i = 0; i < alternatives.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const alternative = await this.alternativesRepository.create({
        question_id,
        letter: alternatives[i].letter,
        description: alternatives[i].description,
      });

      createdAlternatives.push(alternative);
    }

    this.cacheProvider.invalidatePrefix(`alternatives-list:${question_id}`);

    return createdAlternatives;
  }
}

export default CreateAlternativesService;
