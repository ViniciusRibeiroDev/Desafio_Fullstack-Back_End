import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { TUser } from '../../interfaces/user.interface';

export const loginService = async (userData: TUser): Promise<string> => {
  const token = sign({}, process.env.SECRET_KEY!, {
    subject: String(userData.id),
    expiresIn: '1d',
  });

  return token;
};
