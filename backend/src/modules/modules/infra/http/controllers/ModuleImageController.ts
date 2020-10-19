import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateModuleImageService from '@modules/modules/services/UpdateModuleImageService';

export default class ModuleImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateModuleImage = container.resolve(UpdateModuleImageService);

    const module = await updateModuleImage.execute({
      module_id: id,
      imageFilename: request.file.filename,
    });

    return response.json(module);
  }
}
