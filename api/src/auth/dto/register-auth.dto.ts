import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsArray,
  ValidateNested,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class RegisterTargetLanguageDto {
  @ApiProperty({
    example: 'ES',
    description: 'Target language code (ISO 639-1)',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    example: 'BEGINNER',
    description: 'Nivel de competencia',
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  level: string;
}

export class RegisterAuthDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password for the user account',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birth date of the user in YYYY-MM-DD format',
  })
  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @ApiProperty({
    example: 'America/New_York',
    description: 'Time zone of the user',
  })
  @IsString()
  @IsNotEmpty()
  timeZone: string;

  @ApiProperty({
    example: ['EN', 'FR'],
    description: 'Array of native language codes of the user',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  nativeLanguages: string[];

  @ApiProperty({
    type: [RegisterTargetLanguageDto],
    description: 'Array of target languages with proficiency levels',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterTargetLanguageDto)
  targetLanguages: RegisterTargetLanguageDto[];

  @ApiProperty({
    example: 'https://example.com/avatars/johndoe.jpg',
    description: 'URL of the user avatar image',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;
}
