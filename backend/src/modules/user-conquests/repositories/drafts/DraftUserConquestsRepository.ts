import { ObjectID } from 'mongodb';

import IUserConquestsRepository from '@modules/user-conquests/repositories/IUserConquestsRepository';

import ICreateUserConquestDTO from '@modules/user-conquests/dtos/ICreateUserConquestDTO';

import UserConquest from '../../infra/typeorm/schemas/UserConquest';

export default class DraftUserConquestsRepository
  implements IUserConquestsRepository {
  private userConquests: UserConquest[] = [];

  public async findAllByUserId(user_id: string): Promise<UserConquest[]> {
    const userConquests = this.userConquests.filter(
      findUserConquest => findUserConquest.user_id === user_id,
    );

    return userConquests;
  }

  public async findByUserAndConquestId(
    user_id: string,
    conquest_id: string,
  ): Promise<UserConquest | undefined> {
    const userAnswer = this.userConquests.find(
      findUserConquest =>
        findUserConquest.user_id === user_id &&
        findUserConquest.conquest_id === conquest_id,
    );

    return userAnswer;
  }

  public async findById(id: string): Promise<UserConquest | undefined> {
    const userAnswer = this.userConquests.find(
      findUserConquest => findUserConquest.id === id,
    );

    return userAnswer;
  }

  public async create({
    user_id,
    conquest_id,
  }: ICreateUserConquestDTO): Promise<UserConquest> {
    const userConquest = new UserConquest();

    Object.assign(userConquest, {
      id: new ObjectID(),
      user_id,
      conquest_id,
    });

    this.userConquests.push(userConquest);

    return userConquest;
  }

  public async remove(userConquest: UserConquest): Promise<void> {
    const findIndex = this.userConquests.findIndex(
      findUserConquest => findUserConquest.id === userConquest.id,
    );

    this.userConquests.splice(findIndex, 1);
  }

  public async removeAllByConquestId(conquest_id: string): Promise<void> {
    const userConquests = this.userConquests.filter(
      findUserConquest => findUserConquest.conquest_id === conquest_id,
    );

    for (let i = 0; i < userConquests.length; i += 1) {
      const findIndex = this.userConquests.findIndex(
        findUserConquest => findUserConquest.id === userConquests[i].id,
      );

      this.userConquests.splice(findIndex, 1);
    }
  }
}
