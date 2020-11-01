import SubModule from '../infra/typeorm/entities/SubModule';

import ICreateSubModuleDTO from '../dtos/ICreateOrUpdateSubModuleDTO';

export default interface ISubModulesRepository {
  findAllFilteredSubModules(module_id: string): Promise<SubModule[]>;
  findById(id: string): Promise<SubModule | undefined>;
  create(data: ICreateSubModuleDTO): Promise<SubModule>;
  save(subModule: SubModule): Promise<SubModule>;
  remove(subModule: SubModule): Promise<void>;
}
