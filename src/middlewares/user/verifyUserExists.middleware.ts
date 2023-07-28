import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../error';

export const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = res.locals;

  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: Promise<User | null> = repository.findOne({
    where: { id: userId },
  });

  if ((await user) === null) throw new AppError('User not found.', 404);

  next();
};
