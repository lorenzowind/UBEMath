import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Level from '../infra/typeorm/entities/Level';

import ILevelsRepository from '../repositories/ILevelsRepository';

@injectable()
class ListLevelsService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Level[]> {
    let levels = await this.cacheProvider.recover<Level[]>(
      `levels-list:${user_id}`,
    );

    if (!levels) {
      levels = await this.levelsRepository.findAllLevels();

      await this.cacheProvider.save(`levels-list:${user_id}`, levels);
    }

    return levels;
  }
}

export default ListLevelsService;
