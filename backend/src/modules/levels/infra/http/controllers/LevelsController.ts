import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLevelService from '@modules/levels/services/CreateLevelService';
import UpdateLevelService from '@modules/levels/services/UpdateLevelService';
import DeleteLevelService from '@modules/levels/services/DeleteLevelService';
import ListLevelsService from '@modules/levels/services/ListLevelsService';

export default class LevelsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createLevel = container.resolve(CreateLevelService);

    const level = await createLevel.execute({
      name,
    });

    return response.json(level);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateLevel = container.resolve(UpdateLevelService);

    const level = await updateLevel.execute({
      id,
      name,
    });

    return response.json(level);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLevel = container.resolve(DeleteLevelService);

    await deleteLevel.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listLevels = container.resolve(ListLevelsService);

    const levels = await listLevels.execute(id);

    return response.json(levels);
  }
}
