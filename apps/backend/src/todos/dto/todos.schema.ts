import { Priority } from '@prisma/client';
import z from 'zod';

export const CreateTodoBodySchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  userId: z.string().cuid('Invalid user ID'),
  priority: z.nativeEnum(Priority).optional(),
  completed: z.boolean().optional(),
  pinned: z.boolean().optional(),
});

export const UpdateTodoBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.nativeEnum(Priority).optional(),
  completed: z.boolean().optional(),
  pinned: z.boolean().optional(),
  userId: z.string().cuid('Invalid user ID').optional(),
});

export const TodoResponseSchema = z.object({
  id: z.string().cuid('Invalid todo ID'),
  title: z.string(),
  description: z.string().optional(),
  userId: z.string().cuid('Invalid user ID'),
  priority: z.nativeEnum(Priority).optional(),
  completed: z.boolean().optional(),
  pinned: z.boolean().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const TodosQueryParamsSchema = z.object({
  page: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().int().min(1).default(10),
  ),
});
