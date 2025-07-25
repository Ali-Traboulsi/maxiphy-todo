import z from 'zod';

export const authRegisterBodySchema = z.object({
  email: z.email().min(5).max(255),
  password: z.string().min(6).max(100),
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
});

export const authLoginBodySchema = z.object({
  email: z.email().min(5).max(255),
  password: z.string().min(6).max(100),
});

export const authResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
    name: z.string(),
  }),
  token: z.string(),
});

export const authUpdateBodySchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .min(5)
    .max(255)
    .optional(),
  password: z.string().min(6).max(100).optional(),
  name: z.string().min(2).max(100).optional(),
});
