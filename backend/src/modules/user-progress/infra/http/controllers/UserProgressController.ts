import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserProgressService from '@modules/user-progress/services/CreateUserProgressService';
import DeleteUserProgressService from '@modules/user-progress/services/DeleteUserProgressService';
import ListUserProgressService from '@modules/user-progress/services/ListUserProgressService';
import ListCustomUserProgressService from '@modules/user-progress/services/ListCustomUserProgressService';

export default class UserProgressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { sub_module_id } = request.body;

    const createUserProgress = container.resolve(CreateUserProgressService);

    const userProgress = await createUserProgress.execute({
      user_id,
      sub_module_id,
    });

    return response.json(userProgress);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserProgress = container.resolve(DeleteUserProgressService);

    await deleteUserProgress.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { module_id } = request.params;

    const listUserProgress = container.resolve(ListUserProgressService);

    const userProgress = await listUserProgress.execute(user_id, module_id);

    return response.json(userProgress);
  }

  public async custom(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listCustomUserProgress = container.resolve(
      ListCustomUserProgressService,
    );

    const customUserProgress = await listCustomUserProgress.execute(user_id);

    return response.json(customUserProgress);
  }
}
