import { Request, Response } from 'express';
import { createUserService } from '../../services/user/createUser.service';
import { TUserResult } from '../../interfaces/user.interface';

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { body } = req;

  const result: TUserResult = await createUserService(body);

  return res.status(201).json(result);
};
