import { z } from 'zod';
import {
  contactRequestSchema,
  contactSchema,
  contactUpdateRequestSchema,
} from '../schemas/contact.schema';

export type TContact = z.infer<typeof contactSchema>;

export type TContactRequest = z.infer<typeof contactRequestSchema>;
