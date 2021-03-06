import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

import ISubModuleResponseDTO from '../dtos/ISubModuleResponseDTO';

@injectable()
class ListFilteredSubModulesService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    module_id: string,
  ): Promise<ISubModuleResponseDTO[]> {
    const checkModuleExists = await this.modulesRepository.findById(module_id);

    if (!checkModuleExists) {
      throw new AppError('Module not found.');
    }

    let auxSubModules = await this.cacheProvider.recover<
      ISubModuleResponseDTO[]
    >(`sub-modules-list:${module_id}:${user_id}`);

    if (!auxSubModules) {
      const subModules = await this.subModulesRepository.findAllFilteredSubModules(
        module_id,
      );

      auxSubModules = [];

      for (let i = 0; i < subModules.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const materials = await this.materialsRepository.findAllMaterialsBySubModuleId(
          subModules[i].id,
        );

        auxSubModules[i] = {
          ...subModules[i],
          content: materials,
        };
      }

      await this.cacheProvider.save(
        `sub-modules-list:${module_id}:${user_id}`,
        auxSubModules,
      );
    }

    return auxSubModules;
  }
}

export default ListFilteredSubModulesService;
