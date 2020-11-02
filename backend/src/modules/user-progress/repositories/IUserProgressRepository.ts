import ICreateUserProgressDTO from '../dtos/ICreateUserProgressDTO';

import UserProgress from '../infra/typeorm/schemas/UserProgress';

export default interface IUserProgressRepository {
  findAllByUserId(user_id: string): Promise<UserProgress[]>;
  findByUserAndSubModuleId(
    user_id: string,
    sub_module_id: string,
  ): Promise<UserProgress | undefined>;
  findById(id: string): Promise<UserProgress | undefined>;
  create(data: ICreateUserProgressDTO): Promise<UserProgress>;
  remove(userProgress: UserProgress): Promise<void>;
  removeAllBySubModuleId(sub_module_id: string): Promise<void>;
}
