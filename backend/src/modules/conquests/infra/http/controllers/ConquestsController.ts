import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateConquestService from '@modules/conquests/services/CreateConquestService';
import UpdateConquestService from '@modules/conquests/services/UpdateConquestService';
import DeleteConquestService from '@modules/conquests/services/DeleteConquestService';
import ListConquestsService from '@modules/conquests/services/ListConquestsService';

export default class ConquestsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createConquest = container.resolve(CreateConquestService);

    const conquest = await createConquest.execute({ name, description });

    return response.json(conquest);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateConquest = container.resolve(UpdateConquestService);

    const conquest = await updateConquest.execute({
      id,
      name,
      description,
    });

    return response.json(conquest);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteConquest = container.resolve(DeleteConquestService);

    await deleteConquest.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listConquests = container.resolve(ListConquestsService);

    const conquests = await listConquests.execute(user_id);

    return response.json(conquests);
  }
}
