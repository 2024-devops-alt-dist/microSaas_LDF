import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RequestRole } from '../dto/match-criteria.dto';
import { ApiProperty } from '@nestjs/swagger';

export type RequestDocument = HydratedDocument<CircleRequest>;

@Schema({ _id: false })
export class MatchCriteria {
  @ApiProperty({
    enum: RequestRole,
    example: 'LEARNER',
    description: 'Role of the user in the circle',
  })
  @Prop({ required: true, enum: RequestRole })
  role: string;

  @ApiProperty({
    example: 'ES',
    description:
      'Language code of the language(whether target or native) based on the user role',
  })
  @Prop({ required: true })
  language: string;

  @ApiProperty({
    example: 'BEGINNER',
    description: 'Proficiency level in the specified language',
  })
  @Prop({ required: true })
  level: string;
}

const MatchCriteriaSchema = SchemaFactory.createForClass(MatchCriteria);
@Schema({ timestamps: true, collection: 'circle_requests' })
export class CircleRequest {
  @ApiProperty({
    type: String,
    description: 'Internal ID of the request',
    example: '60d0fe4f5311236168a109ca',
  })
  _id: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Internal ID of the user',
    example: '60d0fe4f5311236168a109ca',
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    example: 'JOIN',
    description: 'Type of the request',
  })
  @Prop({ required: true, enum: ['MATCHMAKING', 'JOIN'] })
  type: string;

  @ApiProperty({
    type: String,
    description: 'Name of the member requesting',
    example: 'John Doe',
  })
  @Prop({ required: true })
  memberName: string;

  @ApiProperty({
    example: 'PENDING',
    description: 'Current status of the request',
  })
  @Prop({
    required: true,
    enum: ['PENDING', 'MATCHED', 'REJECTED'],
    default: 'PENDING',
  })
  status: string;

  @ApiProperty({
    type: String,
    description: 'Internal ID of the target circle',
    example: '60d0fe4f5311236168a109ca',
  })
  @Prop({ type: Types.ObjectId, ref: 'Circle', default: null })
  targetCircleId: Types.ObjectId;

  @ApiProperty({
    type: MatchCriteria,
    description: 'Criteria for matching the user to the circle',
    example: {
      role: 'LEARNER',
      language: 'ES',
      level: 'BEGINNER',
    },
  })
  @Prop({ type: MatchCriteriaSchema, required: true })
  matchCriteria: MatchCriteria;
}

export const RequestSchema = SchemaFactory.createForClass(CircleRequest);
