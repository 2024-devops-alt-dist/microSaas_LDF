import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CirclesService } from './circles.service';

@Controller('circles')
export class CirclesController {
  constructor(private readonly circlesService: CirclesService) {}

  // --- QUERIES ---

  @Get('mycircles')
  findMyCircles(@Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId query parameter is required');
    }
    return this.circlesService.findMyCircles(userId);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.circlesService.findByType(type);
  }

  @Get()
  findAll() {
    return this.circlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circlesService.findOne(id);
  }

  // --- BASIC CRUD ---

  @Post()
  create(@Body() createCircleDto: any) {
    return this.circlesService.create(createCircleDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCircleDto: any) {
    return this.circlesService.update(id, updateCircleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.circlesService.remove(id);
  }

  // --- USER ACCTIONS ---

  @Post(':id/leave')
  leaveCircle(@Param('id') id: string, @Body('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.circlesService.leaveCircle(id, userId);
  }
}
