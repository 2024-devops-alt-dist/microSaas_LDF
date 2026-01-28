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
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  level: string;
}

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  timeZone: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  nativeLanguages: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterTargetLanguageDto)
  targetLanguages: RegisterTargetLanguageDto[];

  @IsString()
  @IsOptional()
  avatar?: string;
}
