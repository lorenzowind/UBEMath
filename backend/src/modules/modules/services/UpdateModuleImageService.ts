import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import IModulesRepository from '../repositories/IModulesRepository';

import Module from '../infra/typeorm/entities/Module';

interface IRequest {
  module_id: string;
  imageFilename: string;
}

@injectable()
class UpdateModuleImageService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    module_id,
    imageFilename,
  }: IRequest): Promise<Module> {
    const module = await this.modulesRepository.findById(module_id);

    if (!module) {
      throw new AppError('Module not found.');
    }

    if (module.image) {
      await this.storageProvider.deleteFile(module.image);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    module.image = fileName;

    await this.modulesRepository.save(module);

    return module;
  }
}

export default UpdateModuleImageService;
