import { TUserRequest, TUserResult } from '../../interfaces/user.interface';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AppDataSource } from '../../data-source';
import { userResultSchema } from '../../schemas/user.schema';

export const createUserService = async (
  data: TUserRequest
): Promise<TUserResult> => {
  const repository: Repository<User> = AppDataSource.getRepository(User);

  const newData: User = repository.create(data);
  await repository.save(newData);

  console.log(newData);

  return userResultSchema.parse(newData);
};
