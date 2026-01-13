import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RequestDocument = HydratedDocument<Request>;

@Schema({ timestamps: true })
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: ['MATCHMAKING', 'JOIN'] })
  type: string;

  @Prop({
    required: true,
    enum: ['PENDING', 'MATCHED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Circle', default: null })
  targetCircleId: Types.ObjectId;

  @Prop({ type: Object })
  matchCriteria: Record<string, any>;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
