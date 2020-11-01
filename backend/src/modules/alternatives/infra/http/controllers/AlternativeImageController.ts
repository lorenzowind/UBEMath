import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAlternativeImageService from '@modules/alternatives/services/UpdateAlternativeImageService';

export default class AlternativeController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateAlternativeImage = container.resolve(
      UpdateAlternativeImageService,
    );

    const alternative = await updateAlternativeImage.execute({
      alternative_id: id,
      imageFilename: request.file.filename,
    });

    return response.json(alternative);
  }
}
