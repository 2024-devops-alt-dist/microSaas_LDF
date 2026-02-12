import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // This endpoint is called when the user opens the chat
  @Get('circle/:circleId')
  async getChatHistory(@Param('circleId') circleId: string) {
    return this.messagesService.findAllByCircle(circleId);
  }
}
