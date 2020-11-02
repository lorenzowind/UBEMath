import { injectable, inject } from 'tsyringe';

import UserConquest from '../infra/typeorm/schemas/UserConquest';

import IUserConquestsRepository from '../repositories/IUserConquestsRepository';

@injectable()
class ListUserConquestsService {
  constructor(
    @inject('UserConquestsRepository')
    private userConquestsRepository: IUserConquestsRepository,
  ) {}

  public async execute(user_id: string): Promise<UserConquest[]> {
    const userAnswers = await this.userConquestsRepository.findAllByUserId(
      user_id,
    );

    return userAnswers;
  }
}

export default ListUserConquestsService;
