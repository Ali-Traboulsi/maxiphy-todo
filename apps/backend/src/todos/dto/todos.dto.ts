import { createZodDto } from 'nestjs-zod';
import {
  CreateTodoBodySchema,
  TodoResponseSchema,
  TodosQueryParamsSchema,
  UpdateTodoBodySchema,
} from './todos.schema';

export class CreateTodoBodyDto extends createZodDto(CreateTodoBodySchema) {}

export class UpdateTodoBodyDto extends createZodDto(UpdateTodoBodySchema) {}

export class TodoResponseDto extends createZodDto(TodoResponseSchema) {}

export class TodosQueryParamsDto extends createZodDto(TodosQueryParamsSchema) {}
