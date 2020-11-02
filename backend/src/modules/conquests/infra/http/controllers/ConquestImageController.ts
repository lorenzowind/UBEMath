import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateConquestImageService from '@modules/conquests/services/UpdateConquestImageService';

export default class ConquestImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateConquestImage = container.resolve(UpdateConquestImageService);

    const conquest = await updateConquestImage.execute({
      conquest_id: id,
      imageFilename: request.file.filename,
    });

    return response.json(conquest);
  }
}
