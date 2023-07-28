import { Router } from 'express';
import { validatedBodyMiddleware } from '../middlewares/validatedBody.middleware';
import {
  contactRequestSchema,
  contactUpdateRequestSchema,
} from '../schemas/contact.schema';
import { createContactController } from '../controllers/contact/createContact.controller';
import { getYourContactController } from '../controllers/contact/getYourContact.controll';
import { verifyUserExists } from '../middlewares/user/verifyUserExists.middleware';
import { updateContactController } from '../controllers/contact/updateContact.controller';
import { deleteContactController } from '../controllers/contact/deleteContact.controller';
import { verifyContactExists } from '../middlewares/contact/verifyContactExists.middleware';
import { verifyAuthorization } from '../middlewares/vefiryAuthorization.middleware';

export const contactRoute = Router();

contactRoute.post(
  '',
  verifyAuthorization,
  validatedBodyMiddleware(contactRequestSchema),
  createContactController
);
contactRoute.get(
  '',
  verifyAuthorization,
  verifyUserExists,
  getYourContactController
);
contactRoute.patch(
  '/:id',
  verifyAuthorization,
  validatedBodyMiddleware(contactUpdateRequestSchema),
  updateContactController
);
contactRoute.delete(
  '/:id',
  verifyAuthorization,
  verifyContactExists,
  deleteContactController
);
