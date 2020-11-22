import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Module from '../infra/typeorm/entities/Module';

import IModulesRepository from '../repositories/IModulesRepository';

@injectable()
class ListModulesService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<Module[]> {
    let modules = await this.cacheProvider.recover<Module[]>(
      `modules-list:${user_id}`,
    );

    if (!modules) {
      modules = await this.modulesRepository.findAllModules();

      await this.cacheProvider.save(
        `modules-list:${user_id}`,
        classToClass(modules),
      );
    }

    return modules;
  }
}

export default ListModulesService;
