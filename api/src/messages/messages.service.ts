import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  // Save Message when sent
  async create(createMessageDto: CreateMessageDto, userId: string) {
    const newMessage = new this.messageModel({
      content: createMessageDto.content,
      circleId: new Types.ObjectId(createMessageDto.circleId),
      senderId: new Types.ObjectId(userId),
      messageType: createMessageDto.messageType || 'TEXT',
      mediaUrl: createMessageDto.mediaUrl,
    });

    const savedMessage = await newMessage.save();

    // Populate
    return savedMessage.populate('senderId', 'name');
  }

  // Get history of messages in a circle
  async findAllByCircle(circleId: string) {
    return this.messageModel
      .find({ circleId: new Types.ObjectId(circleId) })
      .sort({ createdAt: 1 }) // Old ones first
      .populate('senderId', 'name ')
      .exec();
  }
}
