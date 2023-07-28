import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities/contacts.entity';

export const getYourContactService = async (
  id: number
): Promise<Contact[] | null> => {
  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contacts: Promise<Contact[] | null> = repository.find({
    where: { user: { id } },
  });

  return contacts;
};
