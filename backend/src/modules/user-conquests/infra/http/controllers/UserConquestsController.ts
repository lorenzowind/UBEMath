import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserConquestService from '@modules/user-conquests/services/CreateUserConquestService';
import DeleteUserConquestService from '@modules/user-conquests/services/DeleteUserConquestService';
import ListUserConquestsService from '@modules/user-conquests/services/ListUserConquestsService';

export default class UserConquestsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { conquest_id } = request.body;

    const createUserConquest = container.resolve(CreateUserConquestService);

    const userConquest = await createUserConquest.execute({
      user_id,
      conquest_id,
    });

    return response.json(userConquest);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserConquest = container.resolve(DeleteUserConquestService);

    await deleteUserConquest.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserConquests = container.resolve(ListUserConquestsService);

    const userConquests = await listUserConquests.execute(user_id);

    return response.json(userConquests);
  }
}
