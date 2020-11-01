import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Alternative from '../infra/typeorm/entities/Alternative';

import IAlternativesRepository from '../repositories/IAlternativesRepository';

@injectable()
class ListFilteredAlternativesService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
    question_id: string,
  ): Promise<Alternative[]> {
    let alternatives = await this.cacheProvider.recover<Alternative[]>(
      `alternatives-list:${question_id}:${user_id}`,
    );

    if (!alternatives) {
      alternatives = await this.alternativesRepository.findAllFilteredAlternatives(
        question_id,
      );

      await this.cacheProvider.save(
        `alternatives-list:${question_id}:${user_id}`,
        alternatives,
      );
    }

    return alternatives;
  }
}

export default ListFilteredAlternativesService;
