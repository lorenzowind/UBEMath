import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IAlternativesRepository from '../repositories/IAlternativesRepository';

@injectable()
class DeleteAlternativeService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const alternative = await this.alternativesRepository.findById(id);

    if (!alternative) {
      throw new AppError('Alternative not found.');
    }

    this.cacheProvider.invalidatePrefix(
      `alternatives-list:${alternative.question_id}`,
    );

    await this.alternativesRepository.remove(alternative);
  }
}

export default DeleteAlternativeService;
