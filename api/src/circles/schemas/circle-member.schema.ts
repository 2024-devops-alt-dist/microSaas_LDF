import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false })
export class CircleMember {
  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  learningLanguage?: string;

  @Prop([String])
  targetLanguages?: string[];

  @Prop({ default: false })
  isMentor: boolean;

  @Prop([String])
  masteredLanguages?: string[];

  @Prop()
  native?: boolean;

  @Prop()
  certification?: string;
}

export const CircleMemberSchema = SchemaFactory.createForClass(CircleMember);
