import Alternative from '../infra/typeorm/entities/Alternative';

import ICreateAlternativeDTO from '../dtos/ICreateOrUpdateAlternativeDTO';

export default interface IAlternativesRepository {
  findAllFilteredAlternatives(question_id: string): Promise<Alternative[]>;
  findById(id: string): Promise<Alternative | undefined>;
  create(data: ICreateAlternativeDTO): Promise<Alternative>;
  save(alternative: Alternative): Promise<Alternative>;
  remove(alternative: Alternative): Promise<void>;
}
