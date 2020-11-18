import Material from '../infra/typeorm/entities/Material';

import ICreateMaterialDTO from '../dtos/ICreateOrUpdateMaterialDTO';

export default interface IModulesRepository {
  findAllMaterialsBySubModuleId(sub_module_id: string): Promise<Material[]>;
  create(data: ICreateMaterialDTO): Promise<Material>;
  removeAllBySubModuleId(sub_module_id: string): Promise<void>;
}
