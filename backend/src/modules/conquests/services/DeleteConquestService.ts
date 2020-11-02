import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IConquestsRepository from '../repositories/IConquestsRepository';

@injectable()
class DeleteConquestService {
  constructor(
    @inject('ConquestsRepository')
    private conquestsRepository: IConquestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const conquest = await this.conquestsRepository.findById(id);

    if (!conquest) {
      throw new AppError('Conquest not found.');
    }

    this.cacheProvider.invalidatePrefix('conquests-list');

    await this.conquestsRepository.remove(conquest);
  }
}

export default DeleteConquestService;
