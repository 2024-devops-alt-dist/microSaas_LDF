import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export enum CircleType {
  PRACTICE = 'PRACTICE',
  EXCHANGE = 'EXCHANGE',
}

export enum CircleLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export class CreateCircleDto {
  @ApiProperty({
    example: 'Spanish Practice Group',
    description: 'Name of the circle',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: CircleType, example: CircleType.PRACTICE })
  @IsEnum(CircleType)
  @IsNotEmpty()
  type: CircleType;

  @ApiProperty({ enum: CircleLevel, example: CircleLevel.BEGINNER })
  @IsEnum(CircleLevel)
  @IsNotEmpty()
  level: CircleLevel;

  @ApiProperty({
    example: ['ES', 'EN'],
    description: 'Array of language codes supported by the circle',
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @ApiProperty({
    example: true,
    required: false,
    description: 'If true, the circle requires a mentor',
  })
  @IsOptional()
  @IsBoolean()
  requiresMentor?: boolean;
}
