import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftLevelsRepository from '../repositories/drafts/DraftLevelsRepository';

import DeleteLevelService from './DeleteLevelService';

let draftCacheProvider: DraftCacheProvider;

let draftLevelsRepository: DraftLevelsRepository;

let deleteLevel: DeleteLevelService;

describe('DeleteLevel', () => {
  beforeEach(() => {
    draftLevelsRepository = new DraftLevelsRepository();
    draftCacheProvider = new DraftCacheProvider();

    deleteLevel = new DeleteLevelService(
      draftLevelsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing level', async () => {
    await expect(
      deleteLevel.execute('Non existing level id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a level', async () => {
    await draftLevelsRepository.create({
      name: 'Level 01',
      order: 1,
    });

    const level = await draftLevelsRepository.create({
      name: 'Level 02',
      order: 2,
    });

    await deleteLevel.execute(level.id);

    expect(await draftLevelsRepository.findById(level.id)).toBe(undefined);
  });
});
