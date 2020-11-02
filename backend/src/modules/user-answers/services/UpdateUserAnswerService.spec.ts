import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftUserAnswersRepository from '../repositories/drafts/DraftUserAnswersRepository';

import UpdateUserAnswerService from './UpdateUserAnswerService';

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftUserAnswersRepository: DraftUserAnswersRepository;

let updateUserAnswer: UpdateUserAnswerService;

describe('UpdateUserAnswer', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftUserAnswersRepository = new DraftUserAnswersRepository();

    updateUserAnswer = new UpdateUserAnswerService(draftUserAnswersRepository);
  });

  it('should be able to update the user answer', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 01',
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
    });

    const subModule = await draftSubModulesRepository.create({
      module_id: module.id,
      name: 'Sub-module description',
      order: 1,
      content_url: 'Sub-module content URL',
    });

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    const userAnswer = await draftUserAnswersRepository.create({
      user_id: user.id,
      question_id: question.id,
      answer_letter: 'A',
    });

    const updatedUserAnswer = await updateUserAnswer.execute({
      id: userAnswer.id,
      answer_letter: 'B',
    });

    expect(updatedUserAnswer.answer_letter).toBe('B');
  });

  it('should not be able to update from a non existing user answer', async () => {
    await expect(
      updateUserAnswer.execute({
        id: 'non existing user answer id',
        answer_letter: 'B',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
