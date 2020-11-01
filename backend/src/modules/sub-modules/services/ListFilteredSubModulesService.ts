import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import SubModule from '../infra/typeorm/entities/SubModule';

import ISubModulesRepository from '../repositories/ISubModulesRepository';

@injectable()
class ListFilteredSubModulesService {
  constructor(
    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    module_id: string,
  ): Promise<SubModule[]> {
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
