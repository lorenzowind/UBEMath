import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IConquestsRepository from '../repositories/IConquestsRepository';

import Conquest from '../infra/typeorm/entities/Conquest';
import IUpdateConquestDTO from '../dtos/ICreateOrUpdateConquestDTO';

interface IRequest extends IUpdateConquestDTO {
  id: string;
}

@injectable()
class UpdateConquestService {
  constructor(
    @inject('ConquestsRepository')
    private conquestsRepository: IConquestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, name, description }: IRequest): Promise<Conquest> {
    const conquest = await this.conquestsRepository.findById(id);

    if (!conquest) {
      throw new AppError('Conquest not found.');
    }

    const checkConquestNameExists = await this.conquestsRepository.findByName(
      name,
    );

    if (checkConquestNameExists && checkConquestNameExists.id !== id) {
      throw new AppError('Conquest name already in use.');
    }

    conquest.name = name;
    conquest.description = description;

    this.cacheProvider.invalidatePrefix('conquests-list');

    return this.conquestsRepository.save(conquest);
  }
}

export default UpdateConquestService;
