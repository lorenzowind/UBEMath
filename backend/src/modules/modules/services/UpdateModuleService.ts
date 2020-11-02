import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';
import IModulesRepository from '../repositories/IModulesRepository';

import Module from '../infra/typeorm/entities/Module';
import IUpdateModuleDTO from '../dtos/ICreateOrUpdateModuleDTO';

interface IRequest extends IUpdateModuleDTO {
  id: string;
}

@injectable()
class UpdateModuleService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,

    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    description,
    is_exercise,
    level_id,
    order,
  }: IRequest): Promise<Module> {
    const module = await this.modulesRepository.findById(id);

    if (!module) {
      throw new AppError('Module not found.');
    }

    const checkLevelExists = await this.levelsRepository.findById(level_id);

    if (!checkLevelExists) {
      throw new AppError('Level not found.');
    }

    module.name = name;
    module.description = description;
    module.is_exercise = is_exercise;
    module.level_id = level_id;
    module.order = order;

    this.cacheProvider.invalidatePrefix('modules-list');

    return this.modulesRepository.save(module);
  }
}

export default UpdateModuleService;
