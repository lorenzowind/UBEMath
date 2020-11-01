import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

import Question from '../infra/typeorm/entities/Question';
import ICreateQuestionDTO from '../dtos/ICreateOrUpdateQuestionDTO';

@injectable()
class CreateQuestionService {
  constructor(
    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    sub_module_id,
    statement,
    right_letter,
  }: ICreateQuestionDTO): Promise<Question> {
    const checkSubModuleExists = await this.subModulesRepository.findById(
      sub_module_id,
    );

    if (!checkSubModuleExists) {
      throw new AppError('Sub-module not found.');
    }

    const question = await this.questionsRepository.create({
      sub_module_id,
      statement,
      right_letter,
    });

    this.cacheProvider.invalidatePrefix(`questions-list:${sub_module_id}`);

    return question;
  }
}

export default CreateQuestionService;
