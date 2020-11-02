import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUserProgressRepository from '@modules/user-progress/repositories/IUserProgressRepository';
import ISubModulesRepository from '../repositories/ISubModulesRepository';

@injectable()
class DeleteSubModuleService {
  constructor(
    @inject('UserProgressRepository')
    private userProgressRepository: IUserProgressRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<void> {
    const subModule = await this.subModulesRepository.findById(id);

    if (!subModule) {
      throw new AppError('Sub-module not found.');
    }

    await this.userProgressRepository.removeAllBySubModuleId(subModule.id);

    this.cacheProvider.invalidatePrefix(
      `sub-modules-list:${subModule.module_id}`,
    );

    await this.subModulesRepository.remove(subModule);
  }
}

export default DeleteSubModuleService;
