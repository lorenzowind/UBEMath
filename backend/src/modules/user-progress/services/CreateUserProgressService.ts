import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISubModulesRepository from '@modules/sub-modules/repositories/ISubModulesRepository';
import IUserProgressRepository from '../repositories/IUserProgressRepository';

import UserProgress from '../infra/typeorm/schemas/UserProgress';
import ICreateUserProgressDTO from '../dtos/ICreateUserProgressDTO';

@injectable()
class CreateUserProgressService {
  constructor(
    @inject('SubModulesRepository')
    private subModulesRepository: ISubModulesRepository,

    @inject('UserProgressRepository')
    private userProgressRepository: IUserProgressRepository,
  ) {}

  public async execute({
    user_id,
    sub_module_id,
  }: ICreateUserProgressDTO): Promise<UserProgress> {
    const checkSubModuleExists = await this.subModulesRepository.findById(
      sub_module_id,
    );

    if (!checkSubModuleExists) {
      throw new AppError('Sub-module does not exists.');
    }

    const checkUserProgressExists = await this.userProgressRepository.findByUserAndSubModuleId(
      user_id,
      sub_module_id,
    );

    if (checkUserProgressExists) {
      throw new AppError('User progress already exists.');
    }

    const userProgress = await this.userProgressRepository.create({
      user_id,
      sub_module_id,
    });

    return userProgress;
  }
}

export default CreateUserProgressService;
