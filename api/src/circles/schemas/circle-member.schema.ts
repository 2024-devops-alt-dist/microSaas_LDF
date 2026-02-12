import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class CircleMember {
  @ApiProperty({ type: String, description: 'Internal ID of the user' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Name of the circle member',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Role of the circle member',
    example: 'MENTOR',
    enum: ['MENTOR', 'LEARNER', 'ADMIN'],
  })
  @Prop({
    type: String,
    enum: ['MENTOR', 'LEARNER', 'ADMIN'],
    required: true,
  })
  role: string;

  @ApiProperty({
    type: String,
    description: 'Level of the target language for the circle member',
    example: 'ADVANCED',
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
  })
  @Prop()
  level: string;

  @ApiProperty({
    type: String,
    description: 'Language code of the target language for the circle member',
    example: 'ES',
  })
  @Prop()
  language: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  joinedAt: Date;
}

export const CircleMemberSchema = SchemaFactory.createForClass(CircleMember);
