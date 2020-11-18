import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftUsersRepository from '@modules/users/repositories/drafts/DraftUsersRepository';
import DraftLevelsRepository from '@modules/levels/repositories/drafts/DraftLevelsRepository';
import DraftModulesRepository from '@modules/modules/repositories/drafts/DraftModulesRepository';
import DraftSubModulesRepository from '@modules/sub-modules/repositories/drafts/DraftSubModulesRepository';
import DraftUserAnswersRepository from '@modules/user-answers/repositories/drafts/DraftUserAnswersRepository';
import DraftQuestionsRepository from '../repositories/drafts/DraftQuestionsRepository';

import DeleteQuestionService from './DeleteQuestionService';

let draftCacheProvider: DraftCacheProvider;

let draftUsersRepository: DraftUsersRepository;
let draftLevelsRepository: DraftLevelsRepository;
let draftModulesRepository: DraftModulesRepository;
let draftSubModulesRepository: DraftSubModulesRepository;
let draftUserAnswersRepository: DraftUserAnswersRepository;
let draftQuestionsRepository: DraftQuestionsRepository;

let deleteQuestion: DeleteQuestionService;

describe('DeleteQuestion', () => {
  beforeEach(() => {
    draftUsersRepository = new DraftUsersRepository();
    draftLevelsRepository = new DraftLevelsRepository();
    draftModulesRepository = new DraftModulesRepository();
    draftSubModulesRepository = new DraftSubModulesRepository();
    draftUserAnswersRepository = new DraftUserAnswersRepository();
    draftQuestionsRepository = new DraftQuestionsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteQuestion = new DeleteQuestionService(
      draftUserAnswersRepository,
      draftQuestionsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing question', async () => {
    await expect(
      deleteQuestion.execute('Non existing question id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a question', async () => {
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
    });

    const question = await draftQuestionsRepository.create({
      sub_module_id: subModule.id,
      statement: 'Question Statement',
      right_letter: 'A',
    });

    await draftUserAnswersRepository.create({
      user_id: user.id,
      question_id: question.id,
      answer_letter: 'A',
    });

    await deleteQuestion.execute(question.id);

    expect(await draftQuestionsRepository.findById(question.id)).toBe(
      undefined,
    );

    expect(
      await draftUserAnswersRepository.findByUserAndQuestionId(
        user.id,
        question.id,
      ),
    ).toBe(undefined);
  });
});
