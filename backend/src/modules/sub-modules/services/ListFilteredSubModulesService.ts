import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

import SubModule from '../infra/typeorm/entities/SubModule';

@injectable()
class ListFilteredSubModulesService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    module_id: string,
  ): Promise<SubModule[]> {
    const checkModuleExists = await this.modulesRepository.findById(module_id);

    if (!checkModuleExists) {
      throw new AppError('Module not found.');
    }

    let subModules = await this.cacheProvider.recover<SubModule[]>(
      `sub-modules-list:${module_id}:${user_id}`,
    );

    if (!subModules) {
      subModules = await this.subModulesRepository.findAllFilteredSubModules(
        module_id,
      );

      await this.cacheProvider.save(
        `sub-modules-list:${module_id}:${user_id}`,
        subModules,
      );
    }

    return subModules;
  }
}

export default ListFilteredSubModulesService;
