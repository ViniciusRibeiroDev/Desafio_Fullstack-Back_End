import { Router } from 'express';
import { validatedBodyMiddleware } from '../middlewares/validatedBody.middleware';
import {
  userRequestSchema,
  userUpdateRequestSchema,
} from '../schemas/user.schema';
import { verifyEmailExistsMiddleware } from '../middlewares/user/verifyEmailExists.middleware';
import { createUserController } from '../controllers/user/createUser.controller';
import { verifyUserExists } from '../middlewares/user/verifyUserExists.middleware';
import { retriveUserController } from '../controllers/user/retriveUser.controller';
import { updateUserController } from '../controllers/user/updateUser.controller';
import { deleteUserController } from '../controllers/user/deleteuser.controller';
import { verifyAuthorization } from '../middlewares/vefiryAuthorization.middleware';

export const userRoute = Router();

userRoute.post(
  '',
  validatedBodyMiddleware(userRequestSchema),
  verifyEmailExistsMiddleware,
  createUserController
);
userRoute.get(
  '/:id',
  verifyAuthorization,
  verifyUserExists,
  retriveUserController
);
userRoute.patch(
  '/:id',
  validatedBodyMiddleware(userUpdateRequestSchema),
  verifyAuthorization,
  verifyUserExists,
  updateUserController
);
userRoute.delete(
  '/:id',
  verifyAuthorization,
  verifyUserExists,
  deleteUserController
);
