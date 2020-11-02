import AppError from '@shared/errors/AppError';

import DraftCacheProvider from '@shared/container/providers/CacheProvider/drafts/DraftCacheProvider';

import DraftConquestsRepository from '../repositories/drafts/DraftConquestsRepository';

import DeleteConquestService from './DeleteConquestService';

let draftCacheProvider: DraftCacheProvider;

let draftConquestsRepository: DraftConquestsRepository;

let deleteConquest: DeleteConquestService;

describe('DeleteConquest', () => {
  beforeEach(() => {
    draftConquestsRepository = new DraftConquestsRepository();

    draftCacheProvider = new DraftCacheProvider();

    deleteConquest = new DeleteConquestService(
      draftConquestsRepository,
      draftCacheProvider,
    );
  });

  it('should not be able to delete a non existing conquest', async () => {
    await expect(
      deleteConquest.execute('Non existing conquest id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a conquest', async () => {
    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
    });

    await deleteConquest.execute(conquest.id);

    expect(await draftConquestsRepository.findById(conquest.id)).toBe(
      undefined,
    );
  });
});
