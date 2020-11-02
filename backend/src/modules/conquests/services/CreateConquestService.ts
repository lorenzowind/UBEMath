import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IConquestsRepository from '../repositories/IConquestsRepository';

import Conquest from '../infra/typeorm/entities/Conquest';
import ICreateConquestDTO from '../dtos/ICreateOrUpdateConquestDTO';

@injectable()
class CreateConquestService {
  constructor(
    @inject('ConquestsRepository')
    private conquestsRepository: IConquestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    description,
  }: ICreateConquestDTO): Promise<Conquest> {
    const checkConquestNameExists = await this.conquestsRepository.findByName(
      name,
    );

    if (checkConquestNameExists) {
      throw new AppError('Conquest name already in use.');
    }

    const conquest = await this.conquestsRepository.create({
      name,
      description,
    });

    this.cacheProvider.invalidatePrefix('conquests-list');

    return conquest;
  }
}

export default CreateConquestService;
