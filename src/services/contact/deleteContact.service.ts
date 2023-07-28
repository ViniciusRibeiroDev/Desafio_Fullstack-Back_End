import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities/contacts.entity';
import { AppError } from '../../error';

export const deleteContactService = async (
  id: number,
  userId: number
): Promise<void> => {
  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Promise<Contact | null> = repository.findOne({
    where: { user: { id: userId } },
  });

  if (!contact) throw new AppError('Insufficient permission', 403);

  await repository
    .createQueryBuilder('contacts')
    .delete()
    .from(Contact)
    .where('id = :id', { id })
    .execute();

  return;
};
