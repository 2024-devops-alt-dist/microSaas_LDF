import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateJoinRequestDto } from './dto/create-join-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  // 1.Crete Join Request
  @Post('join')
  async requestJoin(@Body() createJoinRequestDto: CreateJoinRequestDto) {
    return this.requestsService.createJoinRequest(
      createJoinRequestDto.userId,
      createJoinRequestDto.circleId,
      createJoinRequestDto.matchCriteria,
    );
  }

  // 2. Approve Join Request (Admin)
  @Post(':id/approve')
  async approveRequest(@Param('id') requestId: string) {
    return this.requestsService.approveRequest(requestId);
  }

  // 3. Show pending requests for a circle)
  @Get('circle/:circleId')
  async getPendingRequests(@Param('circleId') circleId: string) {
    return this.requestsService.findAllPendingForCircle(circleId);
  }
}
