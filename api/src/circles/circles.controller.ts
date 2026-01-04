import { Controller, Get, Post, Body, Param, Delete, Put, Query, BadRequestException } from '@nestjs/common';
import { CirclesService } from './circles.service';
import { Circle } from './schemas/circle.schema';
import { CircleMember } from './schemas/circle-member.schema';

@Controller('circles')
export class CirclesController {
    constructor(private readonly circlesService: CirclesService) {}

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

    // Additional endpoints for user actions can be added here
    @Post(':id/join')
    requestJoinCircle(
        @Param('id') id: string,
        @Body('member') memberData: CircleMember
    ) {
        return this.circlesService.requestJoinCircle(id, memberData);
    }

    @Post(':id/leave')
    leaveCircle(
        @Param('id') id: string,
        @Body('userId') userId: string
    ) {
        return this.circlesService.leaveCircle(id, userId);
    }

    // Additional endpoints for approving/rejecting requests can be added here
    @Post(':id/approve')
    approveRequest(
        @Param('id') id: string,
        @Body('userId') userId: string
    ) {
        return this.circlesService.approveRequest(id, userId);
    }
}