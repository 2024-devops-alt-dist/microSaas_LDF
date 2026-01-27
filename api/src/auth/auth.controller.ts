import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('test-token')
  login(@Body() body: { userId: string }) {
    return this.authService.generateTestToken(body.userId);
  }
}
