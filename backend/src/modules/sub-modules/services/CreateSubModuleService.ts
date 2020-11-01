import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

import SubModule from '../infra/typeorm/entities/SubModule';
import ICreateSubModuleDTO from '../dtos/ICreateOrUpdateSubModuleDTO';

@injectable()
class CreateSubModuleService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    module_id,
    name,
    order,
    content_url,
  }: ICreateSubModuleDTO): Promise<SubModule> {
    const checkModuleExists = await this.modulesRepository.findById(module_id);

    if (!checkModuleExists) {
      throw new AppError('Module not found.');
    }

    const relatedSubModules = await this.subModulesRepository.findAllFilteredSubModules(
      module_id,
    );

    const checkSubModuleOrder = relatedSubModules.find(
      relatedSubModule => relatedSubModule.order === order,
    );

    if (checkSubModuleOrder) {
      throw new AppError('Another sub-module has the same order number.');
    }

    const subModule = await this.subModulesRepository.create({
      module_id,
      name,
      order,
      content_url,
    });

    this.cacheProvider.invalidatePrefix(`sub-modules-list:${module_id}`);

    return subModule;
  }
}

export default CreateSubModuleService;
