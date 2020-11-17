import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import IUserProgressRepository from '../repositories/IUserProgressRepository';

import UserProgress from '../infra/typeorm/schemas/UserProgress';

@injectable()
class ListUserProgressService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('UserProgressRepository')
    private userProgressRepository: IUserProgressRepository,
  ) {}

  public async execute(
    user_id: string,
    module_id: string,
  ): Promise<UserProgress[]> {
    const module = await this.modulesRepository.findById(module_id);

    if (!module) {
      throw new AppError('Module not found.');
    }

    const allUserProgress = await this.userProgressRepository.findAllByUserId(
      user_id,
    );

    const userProgress: UserProgress[] = [];

    const subModules = await this.subModulesRepository.findAllFilteredSubModules(
      module.id,
    );

    allUserProgress.map(async auxUserProgress => {
      const findCustomUserProgress = subModules.find(
        subModule => subModule.id === auxUserProgress.sub_module_id,
      );

      if (findCustomUserProgress) {
        userProgress.push(auxUserProgress);
      }
    });

    return userProgress;
  }
}

export default ListUserProgressService;
