import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';
import { User } from '../../entities/user.entity';

export const verifyPasswordAndEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);
  const { body } = req;

  const user: User | null = await repository
    .createQueryBuilder()
    .where('email = :email', { email: body.email })
    .getOne();

  if (!user) throw new AppError(`Invalid credentials`, 401);

  const passwordBody: string = body.password;

  const passwordUser: string = user.password;

  const passwordVerify: boolean = compareSync(passwordBody, passwordUser);

  if (!passwordVerify) throw new AppError(`Invalid credentials`, 401);

  res.locals.user = user;

  next();
};
