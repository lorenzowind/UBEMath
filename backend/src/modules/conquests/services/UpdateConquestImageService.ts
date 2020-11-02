import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IConquestsRepository from '../repositories/IConquestsRepository';

import Conquest from '../infra/typeorm/entities/Conquest';

interface IRequest {
  conquest_id: string;
  imageFilename: string;
}

@injectable()
class UpdateConquestImageService {
  constructor(
    @inject('ConquestsRepository')
    private conquestsRepository: IConquestsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    conquest_id,
    imageFilename,
  }: IRequest): Promise<Conquest> {
    const conquest = await this.conquestsRepository.findById(conquest_id);

    if (!conquest) {
      throw new AppError('Conquest not found.');
    }

    if (conquest.image) {
      await this.storageProvider.deleteFile(conquest.image);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    conquest.image = fileName;

    await this.conquestsRepository.save(conquest);

    return conquest;
  }
}

export default UpdateConquestImageService;
