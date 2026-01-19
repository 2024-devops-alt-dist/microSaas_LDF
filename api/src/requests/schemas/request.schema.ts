import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RequestRole } from '../dto/match-criteria.dto';

export type RequestDocument = HydratedDocument<Request>;

@Schema({ _id: false })
export class MatchCriteria {
  @Prop({ required: true, enum: RequestRole })
  role: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  level: string;
}

const MatchCriteriaSchema = SchemaFactory.createForClass(MatchCriteria);
@Schema({ timestamps: true })
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: ['MATCHMAKING', 'JOIN'] })
  type: string;

  @Prop({ required: true })
  memberName: string;

  @Prop({
    required: true,
    enum: ['PENDING', 'MATCHED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Circle', default: null })
  targetCircleId: Types.ObjectId;

  @Prop({ type: MatchCriteriaSchema, required: true })
  matchCriteria: MatchCriteria;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
