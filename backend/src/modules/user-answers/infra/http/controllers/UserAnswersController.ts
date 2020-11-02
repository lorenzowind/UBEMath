import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserAnswerService from '@modules/user-answers/services/CreateUserAnswerService';
import UpdateUserAnswerService from '@modules/user-answers/services/UpdateUserAnswerService';
import DeleteUserAnswerService from '@modules/user-answers/services/DeleteUserAnswerService';
import GetUserAnswerService from '@modules/user-answers/services/GetUserAnswerService';

export default class UserAnswersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { question_id, answer_letter } = request.body;

    const createUserAnswer = container.resolve(CreateUserAnswerService);

    const userAnswer = await createUserAnswer.execute({
      user_id,
      question_id,
      answer_letter,
    });

    return response.json(userAnswer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { answer_letter } = request.body;

    const updateUserAnswer = container.resolve(UpdateUserAnswerService);

    const userAnswer = await updateUserAnswer.execute({ id, answer_letter });

    return response.json(userAnswer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserAnswer = container.resolve(DeleteUserAnswerService);

    await deleteUserAnswer.execute(id);

    return response.status(200).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { question_id } = request.params;

    const getUserAnswer = container.resolve(GetUserAnswerService);

    const userAnswer = await getUserAnswer.execute(user_id, question_id);

    return response.json(userAnswer);
  }
}
