import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities/contacts.entity';
import { TContactRequest } from '../../interfaces/contact.interface';
import { AppError } from '../../error';

export const updateContactService = async (
  id: number,
  data: TContactRequest,
  userId: number
): Promise<Contact | null> => {
  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Promise<Contact | null> = repository.findOne({
    where: { user: { id: userId } },
  });

  if (!contact) throw new AppError('Insufficient permission', 403);

  await repository
    .createQueryBuilder()
    .update(Contact)
    .set({
      ...data,
    })
    .where('id = :id', { id })
    .execute();

  const result: Contact | null = await repository.findOneBy({ id });

  return result;
};
