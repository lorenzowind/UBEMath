import AppError from '@shared/errors/AppError';

import DraftStorageProvider from '@shared/container/providers/StorageProvider/drafts/DraftStorageProvider';

import DraftConquestsRepository from '../repositories/drafts/DraftConquestsRepository';

import UpdateConquestImageService from './UpdateConquestImageService';

let draftConquestsRepository: DraftConquestsRepository;

let draftStorageProvider: DraftStorageProvider;

let updateConquestImage: UpdateConquestImageService;

describe('UpdateConquestImage', () => {
  beforeEach(() => {
    draftConquestsRepository = new DraftConquestsRepository();

    draftStorageProvider = new DraftStorageProvider();

    updateConquestImage = new UpdateConquestImageService(
      draftConquestsRepository,
      draftStorageProvider,
    );
  });

  it('should be able to update the conquest with an image', async () => {
    const conquest = await draftConquestsRepository.create({
      name: 'Conquest name',
      description: 'Conquest description',
      order: 1,
    });

    await updateConquestImage.execute({
      conquest_id: conquest.id,
      imageFilename: 'image.jpg',
    });

    await updateConquestImage.execute({
      conquest_id: conquest.id,
      imageFilename: 'image2.jpg',
    });

    expect(conquest.image).toBe('image2.jpg');
  });

  it('should not be able to update the image from non existing conquest', async () => {
    await expect(
      updateConquestImage.execute({
        conquest_id: 'non existing conquest id',
        imageFilename: 'image.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
