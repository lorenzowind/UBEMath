import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

import SubModule from '../infra/typeorm/entities/SubModule';
import IUpdateSubModuleDTO from '../dtos/ICreateOrUpdateSubModuleDTO';

interface IRequest extends IUpdateSubModuleDTO {
  id: string;
}

@injectable()
class UpdateSubModuleService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    module_id,
    name,
    order,
    content_url,
  }: IRequest): Promise<SubModule> {
    const subModule = await this.subModulesRepository.findById(id);

    if (!subModule) {
      throw new AppError('Sub-module not found.');
    }

    const module = await this.modulesRepository.findById(module_id);

    if (!module) {
      throw new AppError('Module not found.');
    }

    const relatedSubModules = await this.subModulesRepository.findAllFilteredSubModules(
      module_id,
    );

    const checkSubModuleOrder = relatedSubModules.find(
      relatedSubModule =>
        relatedSubModule.order === order && relatedSubModule.id !== id,
    );

    if (checkSubModuleOrder) {
      throw new AppError('Another sub-module has the same order number.');
    }

    subModule.module_id = module_id;
    subModule.name = name;
    subModule.order = order;
    subModule.content_url = content_url;

    this.cacheProvider.invalidatePrefix(`sub-modules-list:${module_id}`);

    return this.subModulesRepository.save(subModule);
  }
}

export default UpdateSubModuleService;
