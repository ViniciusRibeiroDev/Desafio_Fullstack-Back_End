import { Request, Response } from 'express';
import { Contact } from '../../entities/contacts.entity';
import { deleteContactService } from '../../services/contact/deleteContact.service';

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { userId } = res.locals;

  await deleteContactService(Number(id), userId);

  return res.status(200).send();
};
