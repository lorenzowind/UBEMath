import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ILevelsRepository from '../repositories/ILevelsRepository';

import Level from '../infra/typeorm/entities/Level';
import IUpdateLevelDTO from '../dtos/ICreateOrUpdateLevelDTO';

interface IRequest extends IUpdateLevelDTO {
  id: string;
}

@injectable()
class UpdateLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, name, order }: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Level not found.');
    }

    const checkLevelNameExists = await this.levelsRepository.findByName(name);

    if (checkLevelNameExists && checkLevelNameExists.id !== id) {
      throw new AppError('Level name already used.');
    }

    const levels = await this.levelsRepository.findAllLevels();

    const checkLevelOrder = levels.find(
      findLevel => findLevel.order === order && findLevel.id !== level.id,
    );

    if (checkLevelOrder) {
      throw new AppError('Another level has the same order number.');
    }

    level.name = name;
    level.order = order;

    this.cacheProvider.invalidatePrefix('levels-list');

    return this.levelsRepository.save(level);
  }
}

export default UpdateLevelService;
