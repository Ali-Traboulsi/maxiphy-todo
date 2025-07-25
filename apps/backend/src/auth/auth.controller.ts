import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'src/decorators/setters/public.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user registration.
   * @param registerDto - The data transfer object containing registration details.
   * @returns A promise that resolves to the result of the registration process.
   */
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Handles user login.
   * @param loginDto - The data transfer object containing login credentials.
   * @returns A promise that resolves to the result of the login process.
   */
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('validate')
  async validateUser(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<any> {
    return this.authService.validateUser(email, password);
  }

  @Get('users/me')
  async getProfile(@Request() req: { headers: { authorization?: string } }) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.authService.getProfile(token);
  }
}
