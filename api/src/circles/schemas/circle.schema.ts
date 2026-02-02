import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CircleMember, CircleMemberSchema } from './circle-member.schema';
import { ApiProperty } from '@nestjs/swagger';

export type CircleDocument = HydratedDocument<Circle>;

@Schema({ timestamps: true })
export class Circle {
  @ApiProperty({
    description: 'Name of the circle',
    example: 'Spanish Practice Group',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Type of the circle',
    example: 'PRACTICE',
    enum: ['PRACTICE', 'EXCHANGE'],
  })
  @Prop({ required: true, enum: ['PRACTICE', 'EXCHANGE'] })
  type: string;

  @ApiProperty({
    description: 'Level of the circle',
    example: 'BEGINNER',
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
  })
  @Prop({ required: true, enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] })
  level: string;

  @ApiProperty({
    description: 'Array of language codes supported by the circle',
    example: ['ES', 'EN'],
  })
  @Prop({ type: [String], required: true })
  languages: string[];

  @ApiProperty({
    description: 'If true, the circle requires a mentor',
    default: true,
  })
  @Prop({ default: true })
  requiresMentor: boolean;

  @ApiProperty({ type: [CircleMember], description: 'Members of the circle' })
  @Prop({ type: [CircleMemberSchema], default: [] })
  members: CircleMember[];
}

export const CircleSchema = SchemaFactory.createForClass(Circle);
