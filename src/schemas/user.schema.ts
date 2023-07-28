import { z } from 'zod';
import { contactSchema } from './contact.schema';

export const userSchema = z.object({
  id: z.number(),
  nomeCompleto: z.string().max(80),
  email: z.string().email().max(80),
  password: z.string(),
  telefone: z.string().max(25),
  dataDeRegistro: z.string().datetime().or(z.date()),
});

export const userRequestSchema = userSchema.omit({
  id: true,
  dataDeRegistro: true,
});

export const userUpdateRequestSchema = userRequestSchema.partial();

export const userResultSchema = userSchema.omit({
  password: true,
});
