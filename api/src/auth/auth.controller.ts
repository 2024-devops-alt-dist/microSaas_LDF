/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // PROFILE
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the profile of the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'The profile of the authenticated user.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token missing or invalid.',
  })
  getProfile(@Request() req) {
    return req.user;
  }

  // REGISTER
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The userhas been successfully registered.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The email is already in use or validation failed.',
  })
  register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }

  // LOGIN
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The userhas been successfully logged in.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  @ApiBody({ type: LoginAuthDto })
  async login(
    @Body() loginDto: LoginAuthDto,
    @Request() req: { user: UserDocument },
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(req.user);

    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return {
      message: 'Login successful',
      user: req.user,
    };
  }
}
