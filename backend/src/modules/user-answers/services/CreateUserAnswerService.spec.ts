import AppError from '@shared/errors/AppError';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftQuestionsRepository from '@modules/questions/repositories/drafts/DraftQuestionsRepository';
import DraftUserAnswersRepository from '../repositories/drafts/DraftUserAnswersRepository';

import CreateUserAnswerService from './CreateUserAnswerService';

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftQuestionsRepository: DraftQuestionsRepository;
let draftUserAnswersRepository: DraftUserAnswersRepository;

let createUserAnswer: CreateUserAnswerService;

describe('CreateUserAnswer', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();
    draftUserAnswersRepository = new DraftUserAnswersRepository();

    createUserAnswer = new CreateUserAnswerService(
      draftQuestionsRepository,
      draftUserAnswersRepository,
    );
  });

  it('should be able to create a new user answer', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
      order: 1,
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

    const userAnswer = await createUserAnswer.execute({
      user_id: user.id,
      question_id: question.id,
      answer_letter: 'A',
    });

    expect(userAnswer).toHaveProperty('id');
  });

  it('should not be able to create a new user answer with a non existing question', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUserAnswer.execute({
        user_id: user.id,
        question_id: 'non existing question id',
        answer_letter: 'A',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user answer in the same question of the same user', async () => {
    const user = await draftUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const module = await draftModulesRepository.create({
      name: 'Module 01',
      description: 'Module description',
      is_exercise: false,
      level_id: level.id,
      order: 1,
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

    await createUserAnswer.execute({
      user_id: user.id,
      question_id: question.id,
      answer_letter: 'A',
    });

    await expect(
      createUserAnswer.execute({
        user_id: user.id,
        question_id: question.id,
        answer_letter: 'B',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
