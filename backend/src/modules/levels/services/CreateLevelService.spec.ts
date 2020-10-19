import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '../repositories/drafts/DraftLevelsRepository';

import CreateLevelService from './CreateLevelService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;

let createLevel: CreateLevelService;

describe('CreateLevel', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftCacheProvider = new DraftCacheProvider();

    createLevel = new CreateLevelService(
      draftLevelsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new level', async () => {
    const level = await createLevel.execute({
      name: 'Level 01',
    });

    expect(level).toHaveProperty('id');
  });

  it('should not be able to create a new level with the same name from another', async () => {
    await createLevel.execute({
      name: 'Level 01',
    });

    await expect(
      createLevel.execute({
        name: 'Level 01',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
