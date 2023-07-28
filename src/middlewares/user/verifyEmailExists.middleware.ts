import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

export const verifyEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);
  const { email } = req.body;

  const user: User | null = await repository.findOne({
    where: { email },
  });

  if (user) throw new AppError('Email already exists.', 409);

  next();
};
