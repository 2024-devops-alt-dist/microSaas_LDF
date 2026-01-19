import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class CircleMember {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: String,
    enum: ['MENTOR', 'LEARNER', 'ADMIN'],
    required: true,
  })
  role: string;

  @Prop()
  level: string;

  @Prop()
  language: string;

  @Prop({ default: Date.now })
  joinedAt: Date;
}

export const CircleMemberSchema = SchemaFactory.createForClass(CircleMember);
