import { z } from 'zod';
import {
  userRequestSchema,
  userResultSchema,
  userSchema,
} from '../schemas/user.schema';

export type TUser = z.infer<typeof userSchema>;

export type TUserRequest = z.infer<typeof userRequestSchema>;
export type TUserResult = z.infer<typeof userResultSchema>;
