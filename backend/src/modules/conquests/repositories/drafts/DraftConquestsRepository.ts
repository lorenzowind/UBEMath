import { v4 } from 'uuid';

import IModulesRepository from '@modules/conquests/repositories/IConquestsRepository';

import ICreateConquestDTO from '@modules/conquests/dtos/ICreateOrUpdateConquestDTO';

import Conquest from '@modules/conquests/infra/typeorm/entities/Conquest';

export default class DraftConquestsRepository implements IModulesRepository {
  private conquests: Conquest[] = [];

  public async findAllConquests(): Promise<Conquest[]> {
    return this.conquests;
  }

  public async findByName(name: string): Promise<Conquest | undefined> {
    const conquest = this.conquests.find(
      findConquest => findConquest.name === name,
    );

    return conquest;
  }

  public async findById(id: string): Promise<Conquest | undefined> {
    const conquest = this.conquests.find(
      findConquest => findConquest.id === id,
    );

    return conquest;
  }

  public async create(conquestData: ICreateConquestDTO): Promise<Conquest> {
    const conquest = new Conquest();

    Object.assign(conquest, { id: v4() }, conquestData);

    this.conquests.push(conquest);

    return conquest;
  }

  public async save(conquest: Conquest): Promise<Conquest> {
    const findIndex = this.conquests.findIndex(
      findConquest => findConquest.id === conquest.id,
    );

    this.conquests[findIndex] = conquest;

    return conquest;
  }

  public async remove(conquest: Conquest): Promise<void> {
    const findIndex = this.conquests.findIndex(
      findConquest => findConquest.id === conquest.id,
    );

    this.conquests.splice(findIndex, 1);
  }
}
