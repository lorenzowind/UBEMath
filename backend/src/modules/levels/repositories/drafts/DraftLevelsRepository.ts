import { v4 } from 'uuid';

import ILevelsRepository from '@modules/levels/repositories/ILevelsRepository';

import ICreateLevelDTO from '@modules/levels/dtos/ICreateOrUpdateLevelDTO';

import Level from '@modules/levels/infra/typeorm/entities/Level';

export default class DraftLevelsRepository implements ILevelsRepository {
  private levels: Level[] = [];

  public async findAllLevels(): Promise<Level[]> {
    return this.levels;
  }

  public async findById(id: string): Promise<Level | undefined> {
    const level = this.levels.find(findLevel => findLevel.id === id);

    return level;
  }

  public async findByName(name: string): Promise<Level | undefined> {
    const level = this.levels.find(findLevel => findLevel.name === name);

    return level;
  }

  public async create(levelData: ICreateLevelDTO): Promise<Level> {
    const level = new Level();

    Object.assign(level, { id: v4() }, levelData);

    this.levels.push(level);

    return level;
  }

  public async save(level: Level): Promise<Level> {
    const findIndex = this.levels.findIndex(
      findLevel => findLevel.id === level.id,
    );

    this.levels[findIndex] = level;

    return level;
  }

  public async remove(level: Level): Promise<void> {
    const findIndex = this.levels.findIndex(
      findLevel => findLevel.id === level.id,
    );

    this.levels.splice(findIndex, 1);
  }
}
