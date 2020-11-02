import { injectable, inject } from 'tsyringe';

import UserConquest from '../infra/typeorm/schemas/UserProgress';

import IUserProgressRepository from '../repositories/IUserProgressRepository';

@injectable()
class ListUserProgressService {
  constructor(
    @inject('UserProgressRepository')
    private userProgressRepository: IUserProgressRepository,
  ) {}

  public async execute(user_id: string): Promise<UserConquest[]> {
    const userProgress = await this.userProgressRepository.findAllByUserId(
      user_id,
    );

    return userProgress;
  }
}

export default ListUserProgressService;
