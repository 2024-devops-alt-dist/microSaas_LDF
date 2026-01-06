import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CircleMember, CircleMemberSchema } from './circle-member.schema';

export type CircleDocument = HydratedDocument<Circle>;

@Schema()
export class Circle {
  @Prop()
  name?: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  level: string;

  // Case 1: PRACTICE
  @Prop()
  language?: string;

  @Prop({ type: [CircleMemberSchema], default: [] })
  members?: CircleMember[];

  // Case 2: EXCHANGE
  @Prop([String])
  languages?: string[];

  @Prop({ type: [CircleMemberSchema], default: [] })
  mentors?: CircleMember[];

  @Prop({ type: [CircleMemberSchema], default: [] })
  learners?: CircleMember[];

  // Waiting list
  @Prop({ type: [CircleMemberSchema], default: [] })
  requests?: CircleMember[];
}

export const CircleSchema = SchemaFactory.createForClass(Circle);
