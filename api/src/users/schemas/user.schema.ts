import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
class TargetLanguage {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  level: string;
}
const TargetLanguageSchema = SchemaFactory.createForClass(TargetLanguage);

@Schema({ _id: false })
class FriendData {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: ['PENDING', 'ACCEPTED'], default: 'PENDING' })
  status: string;

  @Prop({ default: Date.now })
  since: Date;
}
const FriendDataSchema = SchemaFactory.createForClass(FriendData);

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar?: string;

  @Prop()
  birthDate: Date;

  @Prop()
  timeZone: string;

  @Prop([String])
  nativeLanguages: string[];

  @Prop({ type: [TargetLanguageSchema], default: [] })
  targetLanguages: TargetLanguage[];

  @Prop({ type: Types.ObjectId, ref: 'Circle', default: null })
  activeExchangeId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Circle' }], default: [] })
  practiceCircles: Types.ObjectId[];

  @Prop({ type: [FriendDataSchema], default: [] })
  friendList: FriendData[];
}

export const UserSchema = SchemaFactory.createForClass(User);
