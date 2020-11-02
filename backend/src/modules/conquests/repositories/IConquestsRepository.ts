import Conquest from '../infra/typeorm/entities/Conquest';

import ICreateConquestDTO from '../dtos/ICreateOrUpdateConquestDTO';

export default interface IConquestsRepository {
  findAllConquests(): Promise<Conquest[]>;
  findByName(name: string): Promise<Conquest | undefined>;
  findById(id: string): Promise<Conquest | undefined>;
  create(data: ICreateConquestDTO): Promise<Conquest>;
  save(conquest: Conquest): Promise<Conquest>;
  remove(conquest: Conquest): Promise<void>;
}
