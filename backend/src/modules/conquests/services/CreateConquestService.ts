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
    order,
    description,
  }: ICreateConquestDTO): Promise<Conquest> {
    const checkConquestNameExists = await this.conquestsRepository.findByName(
      name,
    );

    if (checkConquestNameExists) {
      throw new AppError('Conquest name already in use.');
    }

    const conquests = await this.conquestsRepository.findAllConquests();

    const checkConquestOrder = conquests.find(
      conquest => conquest.order === order,
    );

    if (checkConquestOrder) {
      throw new AppError('Another conquest has the same order number.');
    }

    const conquest = await this.conquestsRepository.create({
      name,
      order,
      description,
    });

    this.cacheProvider.invalidatePrefix('conquests-list');

    return conquest;
  }
}

export default CreateConquestService;
