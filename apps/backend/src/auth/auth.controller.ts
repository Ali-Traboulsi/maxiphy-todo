import { Controller } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ZodSerializerDto(AuthResponseDto)
  async register(registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ZodSerializerDto(AuthResponseDto)
  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.authService.validateUser(email, password);
  }
}
