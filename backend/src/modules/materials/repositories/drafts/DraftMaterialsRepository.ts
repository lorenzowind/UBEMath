import { v4 } from 'uuid';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

import ICreateMaterialDTO from '@modules/materials/dtos/ICreateOrUpdateMaterialDTO';

import Material from '@modules/materials/infra/typeorm/entities/Material';

export default class DraftMaterialsRepository implements IMaterialsRepository {
  private materials: Material[] = [];

  public async findAllMaterialsBySubModuleId(
    sub_module_id: string,
  ): Promise<Material[]> {
    const findMaterials = this.materials.filter(
      findMaterial => findMaterial.sub_module_id === sub_module_id,
    );

    return findMaterials;
  }

  public async create(materialData: ICreateMaterialDTO): Promise<Material> {
    const material = new Material();

    Object.assign(material, { id: v4() }, materialData);

    this.materials.push(material);

    return material;
  }

  public async removeAllBySubModuleId(sub_module_id: string): Promise<void> {
    const findMaterials = await this.findAllMaterialsBySubModuleId(
      sub_module_id,
    );

    for (let i = 0; i < findMaterials.length; i += 1) {
      const findIndex = this.materials.findIndex(
        findMaterial => findMaterial.id === findMaterials[i].id,
      );

      this.materials.splice(findIndex, 1);
    }
  }
}
