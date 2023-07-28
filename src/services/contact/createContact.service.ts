import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { TContact, TContactRequest } from '../../interfaces/contact.interface';
import { Contact } from '../../entities/contacts.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../error';

export const createContactService = async (
  data: TContactRequest,
  userId: number
): Promise<TContact> => {
  const repositoryContact: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const repositoryUser: Repository<User> = AppDataSource.getRepository(User);

  const contact: Promise<Contact | null> = repositoryContact.findOne({
    where: { user: { id: userId } },
  });

  if (!contact) throw new AppError('Insufficient permission', 403);

  const user: Promise<User | null> = repositoryUser.findOne({
    where: {
      id: userId,
    },
  });

  const newDataRequest = {
    ...data,
    user: await user,
  };

  const newData: Contact = repositoryContact.create(newDataRequest);

  await repositoryContact.save(newData);

  const response: TContact = {
    email: newData.email!,
    id: newData.id,
    nomeCompleto: newData.nomeCompleto,
    telefone: newData.telefone,
    userId: userId,
  };

  return response;
};
