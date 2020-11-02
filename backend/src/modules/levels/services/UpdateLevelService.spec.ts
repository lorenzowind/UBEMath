import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '../repositories/drafts/DraftLevelsRepository';

import UpdateLevelService from './UpdateLevelService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;

let updateLevel: UpdateLevelService;

describe('UpdateLevel', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftCacheProvider = new DraftCacheProvider();

    updateLevel = new UpdateLevelService(
      draftLevelsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the level', async () => {
    const level = await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const updatedLevel = await updateLevel.execute({
      id: level.id,
      name: 'New level 01',
      order: 1,
    });

    expect(updatedLevel.name).toBe('New level 01');
  });

  it('should not be able to update from a non existing level', async () => {
    await expect(
      updateLevel.execute({
        id: 'non existing level id',
        name: 'Level 01',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another level name', async () => {
    await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 02',
      order: 2,
    });

    await expect(
      updateLevel.execute({
        id: level.id,
        name: 'Level 01',
        order: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the level with same order number of another', async () => {
    await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 02',
      order: 2,
    });

    await expect(
      updateLevel.execute({
        id: level.id,
        name: 'Level 02',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
