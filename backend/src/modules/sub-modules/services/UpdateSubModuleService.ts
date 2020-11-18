import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

import ISubModuleRequestDTO from '../dtos/ISubModuleRequestDTO';
import ISubModuleResponseDTO from '../dtos/ISubModuleResponseDTO';

interface IRequest extends ISubModuleRequestDTO {
  id: string;
}

@injectable()
class UpdateSubModuleService {
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
    id,
    module_id,
    name,
    order,
    content,
  }: IRequest): Promise<ISubModuleResponseDTO> {
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

    await this.subModulesRepository.save(subModule);

    const auxSubModule: ISubModuleResponseDTO = {
      ...subModule,
      content: [],
    };

    await this.materialsRepository.removeAllBySubModuleId(subModule.id);

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

export default UpdateSubModuleService;
