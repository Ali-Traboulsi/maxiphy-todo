import { createZodDto } from 'nestjs-zod';
import {
  UserCreateSchema,
  UserResponseSchema,
  UserUpdateSchema,
} from './user.schema';

export class UserCreateDto extends createZodDto(UserCreateSchema) {}

export class UserUpdateDto extends createZodDto(UserUpdateSchema) {}

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
