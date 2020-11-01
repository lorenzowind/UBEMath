import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IQuestionsRepository from '@modules/questions/repositories/IQuestionsRepository';
import IAlternativesRepository from '../repositories/IAlternativesRepository';

import Alternative from '../infra/typeorm/entities/Alternative';
import IUpdateAlternativeDTO from '../dtos/ICreateOrUpdateAlternativeDTO';

interface IRequest extends IUpdateAlternativeDTO {
  id: string;
}

@injectable()
class UpdateAlternativeService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    question_id,
    letter,
    description,
  }: IRequest): Promise<Alternative> {
    const alternative = await this.alternativesRepository.findById(id);

    if (!alternative) {
      throw new AppError('Alternative not found.');
    }

    const checkQuestionExists = await this.questionsRepository.findById(
      question_id,
    );

    if (!checkQuestionExists) {
      throw new AppError('Question not found.');
    }

    alternative.question_id = question_id;
    alternative.letter = letter;
    alternative.description = description;

    this.cacheProvider.invalidatePrefix(`alternatives-list:${question_id}`);

    return this.alternativesRepository.save(alternative);
  }
}

export default UpdateAlternativeService;
