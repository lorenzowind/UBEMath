import { v4 } from 'uuid';

import IAlternativesRepository from '@modules/alternatives/repositories/IAlternativesRepository';

import ICreateAlternativeDTO from '@modules/alternatives/dtos/ICreateOrUpdateAlternativeDTO';

import Alternative from '@modules/alternatives/infra/typeorm/entities/Alternative';

export default class DraftAlternativesRepository
  implements IAlternativesRepository {
  private alternatives: Alternative[] = [];

  public async findAllFilteredAlternatives(
    question_id: string,
  ): Promise<Alternative[]> {
    const listAlternatives = this.alternatives.filter(
      findAlternative => findAlternative.question_id === question_id,
    );

    return listAlternatives;
  }

  public async findById(id: string): Promise<Alternative | undefined> {
    const alternative = this.alternatives.find(
      findAlternative => findAlternative.id === id,
    );

    return alternative;
  }

  public async create(
    alternativeData: ICreateAlternativeDTO,
  ): Promise<Alternative> {
    const alternative = new Alternative();

    Object.assign(alternative, { id: v4() }, alternativeData);

    this.alternatives.push(alternative);

    return alternative;
  }

  public async save(alternative: Alternative): Promise<Alternative> {
    const findIndex = this.alternatives.findIndex(
      findAlternative => findAlternative.id === alternative.id,
    );

    this.alternatives[findIndex] = alternative;

    return alternative;
  }

  public async remove(alternative: Alternative): Promise<void> {
    const findIndex = this.alternatives.findIndex(
      findAlternative => findAlternative.id === alternative.id,
    );

    this.alternatives.splice(findIndex, 1);
  }
}
