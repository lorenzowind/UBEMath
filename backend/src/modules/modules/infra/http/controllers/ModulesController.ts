import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleService from '@modules/modules/services/CreateModuleService';
import UpdateModuleService from '@modules/modules/services/UpdateModuleService';
import DeleteModuleService from '@modules/modules/services/DeleteModuleService';
import ListModulesService from '@modules/modules/services/ListModulesService';

export default class ModulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { level_id, name, description, is_exercise } = request.body;

    const createModule = container.resolve(CreateModuleService);

    const module = await createModule.execute({
      level_id,
      name,
      description,
      is_exercise,
    });

    return response.json(module);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { level_id, name, description, is_exercise } = request.body;

    const updateModule = container.resolve(UpdateModuleService);

    const module = await updateModule.execute({
      id,
      level_id,
      name,
      description,
      is_exercise,
    });

    return response.json(module);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteModule = container.resolve(DeleteModuleService);

    await deleteModule.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listModules = container.resolve(ListModulesService);

    const modules = await listModules.execute(user_id);

    return response.json(modules);
  }
}
