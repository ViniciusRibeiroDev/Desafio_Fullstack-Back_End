import { Router } from 'express';
import { verifyPasswordAndEmail } from '../middlewares/login/verifyPasswordAndEmailmiddleware';
import { loginController } from '../controllers/login/login.controller';

export const loginRouter = Router();

loginRouter.post('', verifyPasswordAndEmail, loginController);
