import { Request, Response } from 'express';
import { createContactService } from '../../services/contact/createContact.service';
import { TContact } from '../../interfaces/contact.interface';

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;
  const { userId } = res.locals;

  const result: TContact = await createContactService(body, userId);

  return res.status(201).json(result);
};
