import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

import Question from '../infra/typeorm/entities/Question';
import IUpdateQuestionDTO from '../dtos/ICreateOrUpdateQuestionDTO';

interface IRequest extends IUpdateQuestionDTO {
  id: string;
}

@injectable()
class UpdateQuestionService {
  constructor(
    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    sub_module_id,
    statement,
    right_letter,
  }: IRequest): Promise<Question> {
    const question = await this.questionsRepository.findById(id);

    if (!question) {
      throw new AppError('Question not found.');
    }

    const subModule = await this.subModulesRepository.findById(sub_module_id);

    if (!subModule) {
      throw new AppError('Sub-module not found.');
    }

    question.sub_module_id = sub_module_id;
    question.statement = statement;
    question.right_letter = right_letter;

    this.cacheProvider.invalidatePrefix(`questions-list:${sub_module_id}`);

    return this.questionsRepository.save(question);
  }
}

export default UpdateQuestionService;
