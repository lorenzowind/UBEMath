import { v4 } from 'uuid';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';

import ICreateSubModuleDTO from '@modules/sub-modules/dtos/ICreateOrUpdateSubModuleDTO';

import SubModule from '@modules/sub-modules/infra/typeorm/entities/SubModule';

export default class DraftSubModulesRepository
  implements ISubModulesRepository {
  private subModules: SubModule[] = [];

  public async findAllFilteredSubModules(
    module_id: string,
  ): Promise<SubModule[]> {
    const findSubModules = this.subModules.filter(
      findSubModule => findSubModule.module_id === module_id,
    );

    return findSubModules;
  }

  public async findById(id: string): Promise<SubModule | undefined> {
    const subModule = this.subModules.find(
      findSubModule => findSubModule.id === id,
    );

    return subModule;
  }

  public async create(subModuleData: ICreateSubModuleDTO): Promise<SubModule> {
    const subModule = new SubModule();

    Object.assign(subModule, { id: v4() }, subModuleData);

    this.subModules.push(subModule);

    return subModule;
  }

  public async save(subModule: SubModule): Promise<SubModule> {
    const findIndex = this.subModules.findIndex(
      findSubModule => findSubModule.id === subModule.id,
    );

    this.subModules[findIndex] = subModule;

    return subModule;
  }

  public async remove(subModule: SubModule): Promise<void> {
    const findIndex = this.subModules.findIndex(
      findSubModule => findSubModule.id === subModule.id,
    );

    this.subModules.splice(findIndex, 1);
  }
}
