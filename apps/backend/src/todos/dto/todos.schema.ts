import { Priority } from 'generated/prisma';
import z from 'zod';

export const CreateTodoBodySchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  userId: z.cuid('Invalid user ID'),
  priority: z.enum(Priority).optional(),
  completed: z.boolean().optional(),
  pinned: z.boolean().optional(),
});

export const UpdateTodoBodySchema = z
  .object({
    title: z.string(),
    description: z.string(),
    priority: z.enum(Priority),
    completed: z.boolean(),
    pinned: z.boolean(),
  })
  .partial();

export const TodoResponseSchema = z.object({
  id: z.cuid('Invalid todo ID'),
  title: z.string(),
  description: z.string().optional(),
  userId: z.cuid('Invalid user ID'),
  priority: z.enum(Priority).optional(),
  completed: z.boolean().optional(),
  pinned: z.boolean().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
