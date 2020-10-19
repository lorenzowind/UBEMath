import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ILevelsRepository from '../repositories/ILevelsRepository';

@injectable()
class DeleteLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Level not found.');
    }

    this.cacheProvider.invalidatePrefix('levels-list');

    await this.levelsRepository.remove(level);
  }
}

export default DeleteLevelService;
