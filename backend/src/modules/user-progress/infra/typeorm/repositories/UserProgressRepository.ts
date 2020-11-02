import { getMongoRepository, MongoRepository } from 'typeorm';

import IUserProgressRepository from '@modules/user-progress/repositories/IUserProgressRepository';

import ICreateUserProgressDTO from '@modules/user-progress/dtos/ICreateUserProgressDTO';

import UserProgress from '../schemas/UserProgress';

class UserProgressRepository implements IUserProgressRepository {
  private ormRepository: MongoRepository<UserProgress>;

  constructor() {
    this.ormRepository = getMongoRepository(UserProgress, 'mongo');
  }

  public async findAllByUserId(user_id: string): Promise<UserProgress[]> {
    const findUserProgress = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserProgress;
  }

  public async findByUserAndSubModuleId(
    user_id: string,
    sub_module_id: string,
  ): Promise<UserProgress | undefined> {
    const findUserProgress = await this.ormRepository.findOne({
      where: { user_id, sub_module_id },
    });

    return findUserProgress;
  }

  public async findById(id: string): Promise<UserProgress | undefined> {
    const findUserProgress = await this.ormRepository.findOne(id);

    return findUserProgress;
  }

  public async create({
    user_id,
    sub_module_id,
  }: ICreateUserProgressDTO): Promise<UserProgress> {
    const userProgress = this.ormRepository.create({ user_id, sub_module_id });

    // Object.assign(userProgress, { id: new ObjectID() });

    await this.ormRepository.save(userProgress);

    return userProgress;
  }

  public async remove(userProgress: UserProgress): Promise<void> {
    await this.ormRepository.remove(userProgress);
  }

  public async removeAllBySubModuleId(sub_module_id: string): Promise<void> {
    const findUserProgress = await this.ormRepository.find({
      where: { sub_module_id },
    });

    await this.ormRepository.remove(findUserProgress);
  }
}

export default UserProgressRepository;
