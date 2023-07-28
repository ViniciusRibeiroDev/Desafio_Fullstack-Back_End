import { Request, Response } from 'express';
import { deleteUserService } from '../../services/user/deleteUser.service';

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  await deleteUserService(Number(id));

  return res.status(204).send();
};
