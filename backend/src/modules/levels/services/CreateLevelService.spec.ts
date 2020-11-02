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
      order: 1,
    });

    expect(level).toHaveProperty('id');
  });

  it('should not be able to create a new level with the same name from another', async () => {
    await createLevel.execute({
      name: 'Level 01',
      order: 1,
    });

    await expect(
      createLevel.execute({
        name: 'Level 01',
        order: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new level with same order number of another', async () => {
    await createLevel.execute({
      name: 'Level 01',
      order: 1,
    });

    await expect(
      createLevel.execute({
        name: 'Level 02',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
