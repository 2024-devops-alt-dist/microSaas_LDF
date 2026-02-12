import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request as ExpressRequest } from 'express';
import { User } from './schemas/user.schema';

interface ExpressRequestWithUser extends ExpressRequest {
  user: {
    userId: string;
  };
}

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users in the application.',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get my user profile' })
  @ApiResponse({
    status: 200,
    description: 'The profile of the authenticated user.',
    type: User,
  })
  getProfile(@Request() req: ExpressRequestWithUser) {
    const myId = req.user.userId;
    return this.usersService.findOne(myId);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Actualizar mis datos' })
  @ApiResponse({
    status: 200,
    description: 'The user profile has been successfully updated.',
    type: User,
  })
  updateProfile(
    @Request() req: ExpressRequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const myId = req.user.userId;
    return this.usersService.update(myId, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID (Public profile)' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID.',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
