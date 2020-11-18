import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

import ISubModuleRequestDTO from '../dtos/ISubModuleRequestDTO';
import ISubModuleResponseDTO from '../dtos/ISubModuleResponseDTO';

@injectable()
class CreateSubModuleService {
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

  public async execute({
    module_id,
    name,
    order,
    content,
  }: ISubModuleRequestDTO): Promise<ISubModuleResponseDTO> {
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
    });

    const auxSubModule: ISubModuleResponseDTO = {
      ...subModule,
      content: [],
    };

    for (let i = 0; i < content.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const material = await this.materialsRepository.create({
        sub_module_id: subModule.id,
        order: content[i].order,
        image_url: content[i].image_url,
      });

      auxSubModule.content.push(material);
    }

    this.cacheProvider.invalidatePrefix(`sub-modules-list:${module_id}`);

    return auxSubModule;
  }
}

export default CreateSubModuleService;
