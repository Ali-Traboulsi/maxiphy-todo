import { createZodDto } from 'nestjs-zod';
import {
  authLoginBodySchema,
  authRegisterBodySchema,
  authResponseSchema,
} from './auth.schema';

export class RegisterDto extends createZodDto(authRegisterBodySchema) {}

export class LoginDto extends createZodDto(authLoginBodySchema) {}

export class AuthResponseDto extends createZodDto(authResponseSchema) {}
