import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IModulesRepository from '../repositories/IModulesRepository';

@injectable()
class DeleteModuleService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const module = await this.modulesRepository.findById(id);

    if (!module) {
      throw new AppError('Module not found.');
    }

    this.cacheProvider.invalidatePrefix('modules-list');

    await this.modulesRepository.remove(module);
  }
}

export default DeleteModuleService;
