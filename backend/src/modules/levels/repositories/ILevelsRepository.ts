import Level from '../infra/typeorm/entities/Level';

import ICreateLevelDTO from '../dtos/ICreateOrUpdateLevelDTO';

export default interface ILevelsRepository {
  findAllLevels(): Promise<Level[]>;
  findById(id: string): Promise<Level | undefined>;
  findByName(name: string): Promise<Level | undefined>;
  create(data: ICreateLevelDTO): Promise<Level>;
  save(level: Level): Promise<Level>;
  remove(level: Level): Promise<void>;
}
