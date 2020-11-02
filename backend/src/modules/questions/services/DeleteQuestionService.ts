import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUserAnswersRepository from '@modules/user-answers/repositories/IUserAnswersRepository';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
class DeleteQuestionService {
  constructor(
    @inject('UserAnswersRepository')
    private userAnswersRepository: IUserAnswersRepository,

    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const question = await this.questionsRepository.findById(id);

    if (!question) {
      throw new AppError('Question not found.');
    }

    await this.userAnswersRepository.removeAllByQuestionId(question.id);

    this.cacheProvider.invalidatePrefix(
      `questions-list:${question.sub_module_id}`,
    );

    await this.questionsRepository.remove(question);
  }
}

export default DeleteQuestionService;
