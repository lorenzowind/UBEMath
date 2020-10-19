import Module from '../infra/typeorm/entities/Module';

import ICreateModuleDTO from '../dtos/ICreateOrUpdateModuleDTO';

export default interface IModulesRepository {
  findAllModules(): Promise<Module[]>;
  findById(id: string): Promise<Module | undefined>;
  create(data: ICreateModuleDTO): Promise<Module>;
  save(module: Module): Promise<Module>;
  remove(module: Module): Promise<void>;
}
