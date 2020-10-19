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

  public async execute({ id, name }: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(id);

    if (!level) {
      throw new AppError('Level not found.');
    }

    const checkLevelNameExists = await this.levelsRepository.findByName(name);

    if (checkLevelNameExists && checkLevelNameExists.id !== id) {
      throw new AppError('Level name already used.');
    }

    level.name = name;

    this.cacheProvider.invalidatePrefix('levels-list');

    return this.levelsRepository.save(level);
  }
}

export default UpdateLevelService;
