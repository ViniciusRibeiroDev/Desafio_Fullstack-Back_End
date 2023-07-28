import { Request, Response } from 'express';
import { retriveUserService } from '../../services/user/retriveUser.service';
import { TUserResult } from '../../interfaces/user.interface';

export const retriveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const user: TUserResult | null = await retriveUserService(Number(id));

  return res.status(200).json(user);
};
