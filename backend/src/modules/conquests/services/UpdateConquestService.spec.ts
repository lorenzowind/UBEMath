import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftConquestsRepository from '../repositories/drafts/DraftConquestsRepository';

import UpdateConquestService from './UpdateConquestService';

let draftCacheProvider: DraftCacheProvider;

let draftConquestsRepository: DraftConquestsRepository;

let updateConquest: UpdateConquestService;

describe('UpdateConquest', () => {
  beforeEach(() => {
    draftConquestsRepository = new DraftConquestsRepository();

    draftCacheProvider = new DraftCacheProvider();

    updateConquest = new UpdateConquestService(
      draftConquestsRepository,
      draftCacheProvider,
    );
  });

  it('should be able to update the conquest', async () => {
    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    const updatedConquest = await updateConquest.execute({
      id: conquest.id,
      name: 'New conquest name',
      description: 'New conquest description',
      order: 1,
    });

    expect(updatedConquest.name).toBe('New conquest name');
    expect(updatedConquest.description).toBe('New conquest description');
  });

  it('should not be able to update the conquest with the same name of another', async () => {
    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    await draftConquestsRepository.create({
      name: 'Conquest name II',
      description: 'Conquest description',
      order: 2,
    });

    await expect(
      updateConquest.execute({
        id: conquest.id,
        name: 'Conquest name II',
        description: 'New conquest description',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update from a non existing conquest', async () => {
    await expect(
      updateConquest.execute({
        id: 'non existing conquest id',
        name: 'New conquest name',
        description: 'New conquest description',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the conquest with same order number of another', async () => {
    await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name II',
      description: 'Conquest description',
      order: 2,
    });

    await expect(
      updateConquest.execute({
        id: conquest.id,
        name: 'New conquest name',
        description: 'New conquest description',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
