import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

export const deleteUserService = async (id: number): Promise<void> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const user: Promise<User | null> = repository.findOne({
    where: { id },
  });

  if (!user) throw new AppError('Insufficient permission', 403);

  await repository
    .createQueryBuilder('users')
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute();

  return;
};
