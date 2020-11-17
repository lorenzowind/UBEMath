import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';

import ICreateSubModuleDTO from '@modules/sub-modules/dtos/ICreateOrUpdateSubModuleDTO';

import SubModule from '../entities/SubModule';

class SubModulesRepository implements ISubModulesRepository {
  private ormRepository: Repository<SubModule>;

  constructor() {
    this.ormRepository = getRepository(SubModule);
  }

  public async findAllFilteredSubModules(
    module_id: string,
  ): Promise<SubModule[]> {
    const findSubModules = await this.ormRepository.find({
      where: {
        module_id,
      },
    });

    return findSubModules;
  }

  public async findById(id: string): Promise<SubModule | undefined> {
    const findSubModule = await this.ormRepository.findOne(id);

    return findSubModule;
  }

  public async create(subModuleData: ICreateSubModuleDTO): Promise<SubModule> {
    const subModule = this.ormRepository.create(subModuleData);

    Object.assign(subModule, { id: v4() });

    await this.ormRepository.save(subModule);

    return subModule;
  }

  public async save(subModule: SubModule): Promise<SubModule> {
    return this.ormRepository.save(subModule);
  }

  public async remove(subModule: SubModule): Promise<void> {
    await this.ormRepository.remove(subModule);
  }
}

export default SubModulesRepository;
