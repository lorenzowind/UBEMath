import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAlternativesService from '@modules/alternatives/services/CreateAlternativesService';
import UpdateAlternativeService from '@modules/alternatives/services/UpdateAlternativeService';
import DeleteAlternativeService from '@modules/alternatives/services/DeleteAlternativeService';
import ListFilteredAlternativesService from '@modules/alternatives/services/ListFilteredAlternativesService';

export default class AlternativesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { question_id, alternatives } = request.body;

    const createAlternatives = container.resolve(CreateAlternativesService);

    const createdAlternatives = await createAlternatives.execute({
      question_id,
      alternatives,
    });

    return response.json(createdAlternatives);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { question_id, letter, description } = request.body;

    const updateModule = container.resolve(UpdateAlternativeService);

    const alternative = await updateModule.execute({
      id,
      question_id,
      letter,
      description,
    });

    return response.json(alternative);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAlternative = container.resolve(DeleteAlternativeService);

    await deleteAlternative.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { question_id } = request.params;

    const listAlternatives = container.resolve(ListFilteredAlternativesService);

    const alternatives = await listAlternatives.execute(user_id, question_id);

    return response.json(alternatives);
  }
}
