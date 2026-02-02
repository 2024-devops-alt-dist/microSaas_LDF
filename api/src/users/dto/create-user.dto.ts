import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsEnum,
} from 'class-validator';

export class TargetLanguageDto {
  @ApiProperty({
    example: 'ES',
    description: 'Language code of the target language',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    example: 'BEGINNER',
    description: 'Proficiency level in the target language',
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  level: string;
}
export class CreateUserDto {
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
  @IsString()
  @IsNotEmpty()
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
    type: [TargetLanguageDto],
    description: 'Array of target languages with proficiency levels',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TargetLanguageDto)
  targetLanguages: TargetLanguageDto[];

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'URL of the user avatar',
    required: false,
  })
  @IsString()
  @IsOptional()
  avatar?: string;
}
