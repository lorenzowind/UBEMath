import { ObjectID } from 'mongodb';

import IUserProgressRepository from '@modules/user-progress/repositories/IUserProgressRepository';

import ICreateUserProgressDTO from '@modules/user-progress/dtos/ICreateUserProgressDTO';

import UserProgress from '../../infra/typeorm/schemas/UserProgress';

export default class DraftUserProgressRepository
  implements IUserProgressRepository {
  private userProgress: UserProgress[] = [];

  public async findAllByUserId(user_id: string): Promise<UserProgress[]> {
    const userProgress = this.userProgress.filter(
      findUserProgress => findUserProgress.user_id === user_id,
    );

    return userProgress;
  }

  public async findByUserAndSubModuleId(
    user_id: string,
    sub_module_id: string,
  ): Promise<UserProgress | undefined> {
    const userProgress = this.userProgress.find(
      findUserProgress =>
        findUserProgress.user_id === user_id &&
        findUserProgress.sub_module_id === sub_module_id,
    );

    return userProgress;
  }

  public async findById(id: string): Promise<UserProgress | undefined> {
    const userProgress = this.userProgress.find(
      findUserProgress => findUserProgress.id === id,
    );

    return userProgress;
  }

  public async create({
    user_id,
    sub_module_id,
  }: ICreateUserProgressDTO): Promise<UserProgress> {
    const userProgress = new UserProgress();

    Object.assign(userProgress, {
      id: new ObjectID(),
      user_id,
      sub_module_id,
    });

    this.userProgress.push(userProgress);

    return userProgress;
  }

  public async remove(userProgress: UserProgress): Promise<void> {
    const findIndex = this.userProgress.findIndex(
      findUserProgress => findUserProgress.id === userProgress.id,
    );

    this.userProgress.splice(findIndex, 1);
  }

  public async removeAllBySubModuleId(sub_module_id: string): Promise<void> {
    const userProgress = this.userProgress.filter(
      findUserProgress => findUserProgress.sub_module_id === sub_module_id,
    );

    for (let i = 0; i < userProgress.length; i += 1) {
      const findIndex = this.userProgress.findIndex(
        findUserProgress => findUserProgress.id === userProgress[i].id,
      );

      this.userProgress.splice(findIndex, 1);
    }
  }
}
