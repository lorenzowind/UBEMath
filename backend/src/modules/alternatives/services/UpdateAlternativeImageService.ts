import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IAlternativesRepository from '../repositories/IAlternativesRepository';

import Alternative from '../infra/typeorm/entities/Alternative';

interface IRequest {
  alternative_id: string;
  imageFilename: string;
}

@injectable()
class UpdateAlternativeImageService {
  constructor(
    @inject('AlternativesRepository')
    private alternativesRepository: IAlternativesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    alternative_id,
    imageFilename,
  }: IRequest): Promise<Alternative> {
    const alternative = await this.alternativesRepository.findById(
      alternative_id,
    );

    if (!alternative) {
      throw new AppError('Alternative not found.');
    }

    if (alternative.image) {
      await this.storageProvider.deleteFile(alternative.image);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    alternative.image = fileName;

    await this.alternativesRepository.save(alternative);

    return alternative;
  }
}

export default UpdateAlternativeImageService;
