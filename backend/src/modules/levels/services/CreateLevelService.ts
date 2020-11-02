import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ILevelsRepository from '../repositories/ILevelsRepository';

import Level from '../infra/typeorm/entities/Level';
import ICreateLevelDTO from '../dtos/ICreateOrUpdateLevelDTO';

@injectable()
class CreateLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, order }: ICreateLevelDTO): Promise<Level> {
    const checkLevelNameExists = await this.levelsRepository.findByName(name);

    if (checkLevelNameExists) {
      throw new AppError('Level name already used.');
    }

    const levels = await this.levelsRepository.findAllLevels();

    const checkLevelOrder = levels.find(level => level.order === order);

    if (checkLevelOrder) {
      throw new AppError('Another level has the same order number.');
    }

    const level = await this.levelsRepository.create({
      name,
      order,
    });

    this.cacheProvider.invalidatePrefix('levels-list');

    return level;
  }
}

export default CreateLevelService;
