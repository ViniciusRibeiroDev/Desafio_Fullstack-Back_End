import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { TUserResult } from '../../interfaces/user.interface';
import { userResultSchema } from '../../schemas/user.schema';
import { AppError } from '../../error';

export const retriveUserService = async (
  id: number
): Promise<TUserResult | null> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: Promise<User | null> = repository.findOne({
    where: { id },
  });

  if (!(await user)) throw new AppError('User not found', 404);

  return userResultSchema.parse(await user);
};
