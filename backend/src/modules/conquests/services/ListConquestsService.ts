import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Module from '../infra/typeorm/entities/Conquest';

import IConquestsRepository from '../repositories/IConquestsRepository';

@injectable()
class ListConquestsService {
  constructor(
    @inject('ConquestsRepository')
    private conquestsRepository: IConquestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Module[]> {
    let conquests = await this.cacheProvider.recover<Module[]>(
      `conquests-list:${user_id}`,
    );

    if (!conquests) {
      conquests = await this.conquestsRepository.findAllConquests();

      await this.cacheProvider.save(
        `conquests-list:${user_id}`,
        classToClass(conquests),
      );
    }

    return conquests;
  }
}

export default ListConquestsService;
