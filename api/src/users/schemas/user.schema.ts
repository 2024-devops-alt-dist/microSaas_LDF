import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class TargetLanguage {
  @ApiProperty({
    type: String,
    description: 'Language code of the target language',
    example: 'ES',
  })
  @Prop({ required: true })
  language: string;

  @ApiProperty({
    type: String,
    description: 'Proficiency level in the target language',
    example: 'ADVANCED',
  })
  @Prop({ required: true })
  level: string;
}
const TargetLanguageSchema = SchemaFactory.createForClass(TargetLanguage);

@Schema({ _id: false })
export class FriendData {
  @ApiProperty({ type: String, description: 'Internal ID of the friend user' })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Name of the friend user',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Status of the friendship',
    example: 'PENDING',
    enum: ['PENDING', 'ACCEPTED'],
  })
  @Prop({ type: String, enum: ['PENDING', 'ACCEPTED'], default: 'PENDING' })
  status: string;

  @ApiProperty({
    type: Date,
    description: 'Date since the users are friends',
    example: '2023-01-15T08:00:00Z',
  })
  @Prop({ default: Date.now })
  since: Date;
}
const FriendDataSchema = SchemaFactory.createForClass(FriendData);

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ type: String, description: 'Internal ID of the user' })
  _id: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Name of the user',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password for the user account',
    example: 'strongPassword123',
  })
  @Prop()
  password: string;

  @ApiProperty({
    type: String,
    description: 'URL of the user avatar image',
    example: 'https://example.com/avatars/johndoe.jpg',
  })
  @Prop()
  avatar?: string;

  @ApiProperty({
    type: String,
    description: 'Birth date of the user in YYYY-MM-DD format',
    example: '1990-01-01',
  })
  @Prop()
  birthDate: Date;

  @ApiProperty({
    type: String,
    description: 'Time zone of the user',
    example: 'America/New_York',
  })
  @Prop()
  timeZone: string;

  @ApiProperty({
    type: [String],
    description: 'Array of native language codes of the user',
    example: ['EN', 'FR'],
  })
  @Prop([String])
  nativeLanguages: string[];

  @ApiProperty({
    type: [TargetLanguage],
    description: 'Array of target languages with proficiency levels',
  })
  @Prop({ type: [TargetLanguageSchema], default: [] })
  targetLanguages: TargetLanguage[];

  @ApiProperty({
    type: String,
    description: 'Active exchange circle ID',
    example: '60d21b4667d0d8992e610c85',
  })
  @Prop({ type: Types.ObjectId, ref: 'Circle', default: null })
  activeExchangeId: Types.ObjectId;

  @ApiProperty({
    type: [String],
    description: 'Array of practice circle IDs the user is a member of',
    example: ['60d21b4667d0d8992e610c85', '60d21b4967d0d8992e610c86'],
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Circle' }], default: [] })
  practiceCircles: Types.ObjectId[];

  @ApiProperty({
    type: [FriendData],
    description: 'List of friends with their friendship status',
    example: [
      {
        userId: '60d21b4667d0d8992e610c85',
        name: 'John Doe',
        status: 'PENDING',
        since: '2023-01-15T08:00:00Z',
      },
    ],
  })
  @Prop({ type: [FriendDataSchema], default: [] })
  friendList: FriendData[];
}

export const UserSchema = SchemaFactory.createForClass(User);
