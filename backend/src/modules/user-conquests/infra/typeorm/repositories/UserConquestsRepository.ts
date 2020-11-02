import { getMongoRepository, MongoRepository } from 'typeorm';

import IUserConquestsRepository from '@modules/user-conquests/repositories/IUserConquestsRepository';

import ICreateUserConquestDTO from '@modules/user-conquests/dtos/ICreateUserConquestDTO';

import UserConquest from '../schemas/UserConquest';

class UserConquestsRepository implements IUserConquestsRepository {
  private ormRepository: MongoRepository<UserConquest>;

  constructor() {
    this.ormRepository = getMongoRepository(UserConquest, 'mongo');
  }

  public async findAllByUserId(user_id: string): Promise<UserConquest[]> {
    const findUserConquests = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserConquests;
  }

  public async findByUserAndConquestId(
    user_id: string,
    conquest_id: string,
  ): Promise<UserConquest | undefined> {
    const findUserConquest = await this.ormRepository.findOne({
      where: { user_id, conquest_id },
    });

    return findUserConquest;
  }

  public async findById(id: string): Promise<UserConquest | undefined> {
    const findUserConquest = await this.ormRepository.findOne(id);

    return findUserConquest;
  }

  public async create({
    user_id,
    conquest_id,
  }: ICreateUserConquestDTO): Promise<UserConquest> {
    const userConquest = this.ormRepository.create({ user_id, conquest_id });

    // Object.assign(userConquest, { id: new ObjectID() });

    await this.ormRepository.save(userConquest);

    return userConquest;
  }

  public async remove(userConquest: UserConquest): Promise<void> {
    await this.ormRepository.remove(userConquest);
  }

  public async removeAllByConquestId(conquest_id: string): Promise<void> {
    const findUserConquests = await this.ormRepository.find({
      where: { conquest_id },
    });

    await this.ormRepository.remove(findUserConquests);
  }
}

export default UserConquestsRepository;
