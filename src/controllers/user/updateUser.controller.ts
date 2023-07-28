import { Request, Response } from 'express';
import { updateUserService } from '../../services/user/updateUser.service';
import { TUserResult } from '../../interfaces/user.interface';

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { body } = req;

  const user: TUserResult | null = await updateUserService(Number(id), body);

  return res.status(200).json(user);
};
