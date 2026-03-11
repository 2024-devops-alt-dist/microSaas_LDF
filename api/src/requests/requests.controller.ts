import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateJoinRequestDto } from './dto/create-join-request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CircleRequest } from './schemas/request.schema';

interface ExpressRequestWithUser {
  user: {
    userId: string;
  };
}
@ApiTags('Requests')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  // 1.Crete Join Request
  @Post('join')
  @ApiOperation({ summary: 'Create a join request to a circle' })
  @ApiResponse({
    status: 201,
    type: CircleRequest,
    description: 'The join request has been created.',
  })
  async requestJoin(
    @Body() createJoinRequestDto: CreateJoinRequestDto,
    @Request() req: ExpressRequestWithUser,
  ) {
    return this.requestsService.createJoinRequest(
      req.user.userId,
      createJoinRequestDto.circleId,
      createJoinRequestDto.matchCriteria,
    );
  }

  // 2. Approve Join Request (Admin)
  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a join request' })
  @ApiResponse({
    status: 200,
    type: CircleRequest,
  })
  async approveRequest(
    @Param('id') requestId: string,
    @Request() req: ExpressRequestWithUser,
  ) {
    // TODO: Check if the user is an admin of the circle
    return this.requestsService.approveRequest(requestId, req.user.userId);
  }

  // 3. Show pending requests for a circle)
  @Get('circle/:circleId')
  @ApiOperation({ summary: 'Get pending requests for a circle' })
  @ApiResponse({
    status: 200,
    description: 'List of pending requests for the specified circle.',
    type: [CircleRequest],
  })
  async getPendingRequests(@Param('circleId') circleId: string) {
    return this.requestsService.findAllPendingForCircle(circleId);
  }
}
