import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../error';
import { Contact } from '../../entities/contacts.entity';

export const verifyContactExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params;

  const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

  const contact: Promise<Contact | null> = repository.findOne({
    where: { id: Number(id) },
  });

  if ((await contact) === null) throw new AppError('Contact not found.', 404);

  next();
};
