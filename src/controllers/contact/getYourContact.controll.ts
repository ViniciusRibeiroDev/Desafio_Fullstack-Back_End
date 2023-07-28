import { Request, Response } from 'express';
import { Contact } from '../../entities/contacts.entity';
import { getYourContactService } from '../../services/contact/getYourContact.service';

export const getYourContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = res.locals;

  const result: Contact[] | null = await getYourContactService(userId);

  return res.status(200).json(result);
};
