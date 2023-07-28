import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { TUserRequest, TUserResult } from '../../interfaces/user.interface';
import { userResultSchema } from '../../schemas/user.schema';
import { AppError } from '../../error';

export const updateUserService = async (
  id: number,
  data: TUserRequest
): Promise<TUserResult | null> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: Promise<User | null> = repository.findOne({
    where: { id },
  });

  if (!user) throw new AppError('Insufficient permission', 403);

  await repository
    .createQueryBuilder()
    .update(User)
    .set({
      ...data,
    })
    .where('id = :id', { id })
    .execute();

  const result: User | null = await repository.findOneBy({ id });

  return userResultSchema.parse(result);
};
