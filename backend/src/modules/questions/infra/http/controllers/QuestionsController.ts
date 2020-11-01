import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuestionService from '@modules/questions/services/CreateQuestionService';
import UpdateQuestionService from '@modules/questions/services/UpdateQuestionService';
import DeleteQuestionService from '@modules/questions/services/DeleteQuestionService';
import ListFilteredQuestionsService from '@modules/questions/services/ListFilteredQuestionsService';

export default class QuestionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { sub_module_id, statement, right_letter } = request.body;

    const createQuestion = container.resolve(CreateQuestionService);

    const question = await createQuestion.execute({
      sub_module_id,
      statement,
      right_letter,
    });

    return response.json(question);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { sub_module_id, statement, right_letter } = request.body;

    const updateQuestion = container.resolve(UpdateQuestionService);

    const question = await updateQuestion.execute({
      id,
      sub_module_id,
      statement,
      right_letter,
    });

    return response.json(question);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuestion = container.resolve(DeleteQuestionService);

    await deleteQuestion.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { sub_module_id } = request.params;

    const listFilteredQuestions = container.resolve(
      ListFilteredQuestionsService,
    );

    const filteredQuestions = await listFilteredQuestions.execute(
      user_id,
      sub_module_id,
    );

    return response.json(filteredQuestions);
  }
}
