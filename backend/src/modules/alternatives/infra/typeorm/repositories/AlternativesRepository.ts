import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import IAlternativesRepository from '@modules/alternatives/repositories/IAlternativesRepository';

import ICreateAlternativeDTO from '@modules/alternatives/dtos/ICreateOrUpdateAlternativeDTO';

import Alternative from '../entities/Alternative';

class AlternativesRepository implements IAlternativesRepository {
  private ormRepository: Repository<Alternative>;

  constructor() {
    this.ormRepository = getRepository(Alternative);
  }

  public async findAllFilteredAlternatives(
    question_id: string,
  ): Promise<Alternative[]> {
    const findAlternatives = await this.ormRepository.find({
      where: { question_id },
    });

    return findAlternatives;
  }

  public async findById(id: string): Promise<Alternative | undefined> {
    const findAlternative = await this.ormRepository.findOne(id);

    return findAlternative;
  }

  public async create(
    alternativeData: ICreateAlternativeDTO,
  ): Promise<Alternative> {
    const alternative = this.ormRepository.create(alternativeData);

    Object.assign(alternative, { id: v4() });

    await this.ormRepository.save(alternative);

    return alternative;
  }

  public async save(alternative: Alternative): Promise<Alternative> {
    return this.ormRepository.save(alternative);
  }

  public async remove(alternative: Alternative): Promise<void> {
    await this.ormRepository.remove(alternative);
  }
}

export default AlternativesRepository;
