import { Request, Response } from 'express';
import { loginService } from '../../services/login/login.service';

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;

  const token: string = await loginService(user);

  return res.status(200).json({ token });
};
