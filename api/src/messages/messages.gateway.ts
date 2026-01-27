/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: string;
  name?: string;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token = (client.handshake.auth?.token ||
        client.handshake.headers.authorization) as string;

      if (!token) {
        throw new Error('Token not provided');
      }
      const cleanToken = token.replace('Bearer ', '');

      const payload: { sub: string; name: string } =
        this.jwtService.verify(cleanToken);
      client.data.user = payload as JwtPayload;

      console.log(
        `Client authenticated: ${payload.sub} (Socket: ${client.id})`,
      );
    } catch (error) {
      console.log(`Connection rejected: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinCircle')
  async handleJoinCircle(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { circleId: string },
  ): Promise<{ status: string; circleId: string }> {
    try {
      await client.join(data.circleId);
      return { status: 'joined', circleId: data.circleId };
    } catch (error) {
      console.error('Error joining circle:', error);
      throw error;
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const user = client.data.user as JwtPayload;
    const userId = user?.sub;
    if (!userId) {
      throw new WsException('Usuario no autenticado');
    }
    const message = await this.messagesService.create(createMessageDto, userId);
    this.server.to(createMessageDto.circleId).emit('newMessage', message);

    return message;
  }
}
