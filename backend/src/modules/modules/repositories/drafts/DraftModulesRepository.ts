import { v4 } from 'uuid';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';

import ICreateModuleDTO from '@modules/modules/dtos/ICreateOrUpdateModuleDTO';

import Module from '@modules/modules/infra/typeorm/entities/Module';

export default class DraftModulesRepository implements IModulesRepository {
  private modules: Module[] = [];

  public async findAllModules(): Promise<Module[]> {
    return this.modules;
  }

  public async findById(id: string): Promise<Module | undefined> {
    const module = this.modules.find(findModule => findModule.id === id);

    return module;
  }

  public async create(moduleData: ICreateModuleDTO): Promise<Module> {
    const module = new Module();

    Object.assign(module, { id: v4() }, moduleData);

    this.modules.push(module);

    return module;
  }

  public async save(module: Module): Promise<Module> {
    const findIndex = this.modules.findIndex(
      findModule => findModule.id === module.id,
    );

    this.modules[findIndex] = module;

    return module;
  }

  public async remove(module: Module): Promise<void> {
    const findIndex = this.modules.findIndex(
      findModule => findModule.id === module.id,
    );

    this.modules.splice(findIndex, 1);
  }
}
