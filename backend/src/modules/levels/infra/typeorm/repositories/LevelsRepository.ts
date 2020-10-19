import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';

import ICreateLevelDTO from '@modules/levels/dtos/ICreateOrUpdateLevelDTO';

import Level from '../entities/Level';

class LevelsRepository implements ILevelsRepository {
  private ormRepository: Repository<Level>;

  constructor() {
    this.ormRepository = getRepository(Level);
  }

  public async findAllLevels(): Promise<Level[]> {
    const findLevels = await this.ormRepository.find();

    return findLevels;
  }

  public async findById(id: string): Promise<Level | undefined> {
    const findLevel = await this.ormRepository.findOne(id);

    return findLevel;
  }

  public async findByName(name: string): Promise<Level | undefined> {
    const findLevel = await this.ormRepository.findOne(name);

    return findLevel;
  }

  public async create(levelData: ICreateLevelDTO): Promise<Level> {
    const level = this.ormRepository.create(levelData);

    Object.assign(level, { id: v4() });

    await this.ormRepository.save(level);

    return level;
  }

  public async save(level: Level): Promise<Level> {
    return this.ormRepository.save(level);
  }

  public async remove(level: Level): Promise<void> {
    await this.ormRepository.remove(level);
  }
}

export default LevelsRepository;
