import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubModuleService from '@modules/sub-modules/services/CreateSubModuleService';
import UpdateSubModuleService from '@modules/sub-modules/services/UpdateSubModuleService';
import DeleteSubModuleService from '@modules/sub-modules/services/DeleteSubModuleService';
import ListFilteredSubModulesService from '@modules/sub-modules/services/ListFilteredSubModulesService';

export default class SubModulesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { module_id, name, order, content_url } = request.body;

    const createSubModule = container.resolve(CreateSubModuleService);

    const subModule = await createSubModule.execute({
      module_id,
      name,
      order,
      content_url,
    });

    return response.json(subModule);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { module_id, name, order, content_url } = request.body;

    const updateSubModule = container.resolve(UpdateSubModuleService);

    const subModule = await updateSubModule.execute({
      id,
      module_id,
      name,
      order,
      content_url,
    });

    return response.json(subModule);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSubModule = container.resolve(DeleteSubModuleService);

    await deleteSubModule.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { module_id } = request.params;

    const listFilteredSubModules = container.resolve(
      ListFilteredSubModulesService,
    );

    const filteredSubModules = await listFilteredSubModules.execute(
      user_id,
      module_id,
    );

    return response.json(filteredSubModules);
  }
}
