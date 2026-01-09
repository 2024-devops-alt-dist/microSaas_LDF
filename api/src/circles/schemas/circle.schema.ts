import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CircleMember, CircleMemberSchema } from './circle-member.schema';

export type CircleDocument = HydratedDocument<Circle>;

@Schema({ timestamps: true })
export class Circle {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['PRACTICE', 'EXCHANGE'] })
  type: string;

  @Prop({ required: true, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] })
  level: string;

  @Prop({ type: [String], required: true })
  languages: string[];

  @Prop({ default: true })
  requiresMentor: boolean;

  @Prop({ type: [CircleMemberSchema], default: [] })
  members: CircleMember[];
}

export const CircleSchema = SchemaFactory.createForClass(Circle);
