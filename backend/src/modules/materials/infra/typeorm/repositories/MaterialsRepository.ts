import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';

import ICreateMaterialDTO from '@modules/materials/dtos/ICreateOrUpdateMaterialDTO';

import Material from '../entities/Material';

class MaterialsRepository implements IMaterialsRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async findAllMaterialsBySubModuleId(
    sub_module_id: string,
  ): Promise<Material[]> {
    const findMaterials = await this.ormRepository.find({
      where: {
        sub_module_id,
      },
    });

    return findMaterials;
  }

  public async create(materialData: ICreateMaterialDTO): Promise<Material> {
    const material = this.ormRepository.create(materialData);

    Object.assign(material, { id: v4() });

    await this.ormRepository.save(material);

    return material;
  }

  public async removeAllBySubModuleId(sub_module_id: string): Promise<void> {
    const findMaterials = await this.findAllMaterialsBySubModuleId(
      sub_module_id,
    );

    for (let i = 0; findMaterials.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await this.ormRepository.remove(findMaterials[i]);
    }
  }
}

export default MaterialsRepository;
