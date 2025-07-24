import z from 'zod';
import { ICreateUserBody, IUpdateUserBody, IUserResponse } from './user.types';

export const UserCreateSchema: z.ZodSchema<ICreateUserBody> = z.object({
  email: z
    .email()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters'),
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  avatarUrl: z.url().optional(),
  bio: z.string().max(500).optional(),
  birthday: z.date().optional(),
});

export const UserUpdateSchema: z.ZodSchema<IUpdateUserBody> = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    avatarUrl: z.url(),
    bio: z.string().max(500),
    birthday: z.date(),
  })
  .partial();

export const UserResponseSchema: z.ZodSchema<IUserResponse> = z.object({
  id: z.number(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.url(),
  bio: z.string(),
  birthday: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
