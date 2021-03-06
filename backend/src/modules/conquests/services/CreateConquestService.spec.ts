import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftConquestsRepository from '../repositories/drafts/DraftConquestsRepository';

import CreateConquestService from './CreateConquestService';

let draftCacheProvider: DraftCacheProvider;

let draftConquestsRepository: DraftConquestsRepository;

let createConquest: CreateConquestService;

describe('CreateConquest', () => {
  beforeEach(() => {
    draftConquestsRepository = new DraftConquestsRepository();

    draftCacheProvider = new DraftCacheProvider();

    createConquest = new CreateConquestService(
      draftConquestsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to create a new conquest', async () => {
    const conquest = await createConquest.execute({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    expect(conquest).toHaveProperty('id');
  });

  it('should not be able to create a new conquest with the same name of another', async () => {
    await createConquest.execute({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    await expect(
      createConquest.execute({
        name: 'Conquest name',
        description: 'Conquest description',
        order: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new conquest with same order number of another', async () => {
    await createConquest.execute({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    await expect(
      createConquest.execute({
        name: 'Conquest name II',
        description: 'Conquest description',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
