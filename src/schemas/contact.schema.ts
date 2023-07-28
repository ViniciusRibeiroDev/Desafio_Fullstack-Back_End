import { z } from 'zod';

export const contactSchema = z.object({
  id: z.number(),
  nomeCompleto: z.string().max(80),
  email: z.string().email().max(80),
  telefone: z.string().max(25),
  userId: z.number(),
});

export const contactRequestSchema = contactSchema.omit({
  id: true,
  userId: true,
});

export const contactUpdateRequestSchema = contactRequestSchema.partial();
