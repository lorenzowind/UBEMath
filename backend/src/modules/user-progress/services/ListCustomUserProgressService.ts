import { injectable, inject } from 'tsyringe';

import IModulesRepository from '@modules/modules/repositories/IModulesRepository';
import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import IUserProgressRepository from '../repositories/IUserProgressRepository';

import IUserProgressResponseDTO from '../dtos/IUserProgressResponseDTO';

@injectable()
class ListCustomUserProgressService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,

    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('UserProgressRepository')
    private userProgressRepository: IUserProgressRepository,
  ) {}

  public async execute(user_id: string): Promise<IUserProgressResponseDTO[]> {
    const allUserProgress = await this.userProgressRepository.findAllByUserId(
      user_id,
    );

    const customUserProgress: IUserProgressResponseDTO[] = [];

    for (let i = 0; i < allUserProgress.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const subModule = await this.subModulesRepository.findById(
        allUserProgress[i].sub_module_id,
      );

      if (subModule) {
        // eslint-disable-next-line no-await-in-loop
        const module = await this.modulesRepository.findById(
          subModule.module_id,
        );

        if (module) {
          const findCustomUserProgress = customUserProgress.findIndex(
            auxCustomUserProgress =>
              auxCustomUserProgress.module_id === module.id,
          );

          if (findCustomUserProgress !== -1) {
            customUserProgress[
              findCustomUserProgress
            ].completed_sub_modules_quantity += 1;
          } else {
            // eslint-disable-next-line no-await-in-loop
            const subModules = await this.subModulesRepository.findAllFilteredSubModules(
              module.id,
            );

            customUserProgress.push({
              user_id,
              module_id: module.id,
              completed_sub_modules_quantity: 1,
              sub_modules_quantity: subModules.length,
            });
          }
        }
      }
    }

    return customUserProgress;
  }
}

export default ListCustomUserProgressService;
