import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';

import ICreateModuleDTO from '@modules/modules/dtos/ICreateOrUpdateModuleDTO';

import Module from '../entities/Module';

class ModulesRepository implements IModulesRepository {
  private ormRepository: Repository<Module>;

  constructor() {
    this.ormRepository = getRepository(Module);
  }

  public async findAllModules(): Promise<Module[]> {
    const findModules = await this.ormRepository.find();

    return findModules;
  }

  public async findById(id: string): Promise<Module | undefined> {
    const findModule = await this.ormRepository.findOne(id);

    return findModule;
  }

  public async create(moduleData: ICreateModuleDTO): Promise<Module> {
    const module = this.ormRepository.create(moduleData);

    Object.assign(module, { id: v4() });

    await this.ormRepository.save(module);

    return module;
  }

  public async save(module: Module): Promise<Module> {
    return this.ormRepository.save(module);
  }

  public async remove(module: Module): Promise<void> {
    await this.ormRepository.remove(module);
  }
}

export default ModulesRepository;
