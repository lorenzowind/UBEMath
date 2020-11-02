import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IConquestsRepository from '@modules/conquests/repositories/IConquestsRepository';

import ICreateConquestDTO from '@modules/conquests/dtos/ICreateOrUpdateConquestDTO';

import Conquest from '../entities/Conquest';

class ConquestsRepository implements IConquestsRepository {
  private ormRepository: Repository<Conquest>;

  constructor() {
    this.ormRepository = getRepository(Conquest);
  }

  public async findAllConquests(): Promise<Conquest[]> {
    const findConquests = await this.ormRepository.find();

    return findConquests;
  }

  public async findByName(name: string): Promise<Conquest | undefined> {
    const findConquest = await this.ormRepository.findOne(name);

    return findConquest;
  }

  public async findById(id: string): Promise<Conquest | undefined> {
    const findConquest = await this.ormRepository.findOne(id);

    return findConquest;
  }

  public async create(conquestData: ICreateConquestDTO): Promise<Conquest> {
    const conquest = this.ormRepository.create(conquestData);

    Object.assign(conquest, { id: v4() });

    await this.ormRepository.save(conquest);

    return conquest;
  }

  public async save(conquest: Conquest): Promise<Conquest> {
    return this.ormRepository.save(conquest);
  }

  public async remove(conquest: Conquest): Promise<void> {
    await this.ormRepository.remove(conquest);
  }
}

export default ConquestsRepository;
