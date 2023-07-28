import { Request, Response } from 'express';
import { Contact } from '../../entities/contacts.entity';
import { updateContactService } from '../../services/contact/updateContact.service';

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { body } = req;
  const { userId } = res.locals;

  const result: Contact | null = await updateContactService(
    Number(id),
    body,
    userId
  );

  return res.status(200).json(result);
};
