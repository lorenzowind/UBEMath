import ICreateUserConquestDTO from '../dtos/ICreateUserConquestDTO';

import UserConquest from '../infra/typeorm/schemas/UserConquest';

export default interface IUserConquestsRepository {
  findAllByUserId(user_id: string): Promise<UserConquest[]>;
  findByUserAndConquestId(
    user_id: string,
    conquest_id: string,
  ): Promise<UserConquest | undefined>;
  findById(id: string): Promise<UserConquest | undefined>;
  create(data: ICreateUserConquestDTO): Promise<UserConquest>;
  remove(userConquest: UserConquest): Promise<void>;
  removeAllByConquestId(conquest_id: string): Promise<void>;
}
