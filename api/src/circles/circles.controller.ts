import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CirclesService } from './circles.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCircleDto } from './dto/create-circle.dto';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { AuthGuard } from '@nestjs/passport';
import { Circle } from './schemas/circle.schema';

@ApiTags('Circles')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('circles')
export class CirclesController {
  constructor(private readonly circlesService: CirclesService) {}

  // --- QUERIES ---

  @Get('mycircles')
  @ApiOperation({ summary: 'Get the circles that the user is in' })
  @ApiResponse({
    status: 200,
    description: 'List of circles the user is a member of.',
    type: [Circle],
  })
  findMyCircles(@Request() req: ExpressRequest & { user: { userId: string } }) {
    return this.circlesService.findMyCircles(req.user.userId);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get circles by type' })
  @ApiResponse({
    status: 200,
    description: 'List of circles filtered by type.',
    type: [Circle],
  })
  findByType(@Param('type') type: string) {
    return this.circlesService.findByType(type);
  }

  @Get()
  @ApiOperation({ summary: 'Get all circles' })
  @ApiResponse({
    status: 200,
    description: 'List of all circles in the application.',
    type: [Circle],
  })
  findAll() {
    return this.circlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a circle by ID' })
  @ApiResponse({
    status: 200,
    description: 'The circle with the specified ID.',
    type: Circle,
  })
  findById(@Param('id') id: string) {
    return this.circlesService.findById(id);
  }

  // --- BASIC CRUD ---

  @Post()
  @ApiOperation({ summary: 'Create a new circle' })
  @ApiResponse({
    status: 201,
    description: 'The circle has been successfully created.',
    type: Circle,
  })
  async create(
    @Body() createCircleDto: CreateCircleDto,
    @Request() req: ExpressRequest & { user: { userId: string } },
  ) {
    return this.circlesService.create(createCircleDto, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a circle by ID' })
  @ApiResponse({
    status: 200,
    description: 'The circle has been successfully updated.',
    type: Circle,
  })
  update(@Param('id') id: string, @Body() updateCircleDto: UpdateCircleDto) {
    return this.circlesService.update(id, updateCircleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a circle by ID' })
  @ApiResponse({
    status: 200,
    description: 'The circle has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.circlesService.remove(id);
  }

  // --- USER ACCTIONS ---

  @Post(':id/leave')
  @ApiOperation({ summary: 'Leave a circle' })
  @ApiResponse({
    status: 200,
    description: 'The user has successfully left the circle.',
  })
  leaveCircle(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user: { userId: string } },
  ) {
    return this.circlesService.leaveCircle(id, req.user.userId);
  }
}
