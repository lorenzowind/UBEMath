import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import IModulesRepository from '../repositories/IModulesRepository';

import Module from '../infra/typeorm/entities/Module';
import ICreateModuleDTO from '../dtos/ICreateOrUpdateModuleDTO';

@injectable()
class CreateModuleService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
    is_exercise,
    level_id,
    order,
  }: ICreateModuleDTO): Promise<Module> {
    const checkLevelExists = await this.levelsRepository.findById(level_id);

    if (!checkLevelExists) {
      throw new AppError('Level not found.');
    }

    const module = await this.modulesRepository.create({
      name,
      description,
      is_exercise,
      level_id,
      order,
    });

    this.cacheProvider.invalidatePrefix('modules-list');

    return module;
  }
}

export default CreateModuleService;
