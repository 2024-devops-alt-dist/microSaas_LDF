import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }: { value: string }): string =>
    value?.toUpperCase().trim(),
  )
  @IsEnum(CircleType)
  @IsNotEmpty()
  type: CircleType;

  @ApiProperty({ enum: CircleLevel, example: CircleLevel.BEGINNER })
  @Transform(({ value }: { value: string }): string =>
    value?.toUpperCase().trim(),
  )
  @IsEnum(CircleLevel)
  @IsNotEmpty()
  level: CircleLevel;

  @ApiProperty({
    example: ['ES', 'EN'],
    description: 'Array of language codes supported by the circle',
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v: string) => v.toUpperCase().trim());
    }
    return value as string[];
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
