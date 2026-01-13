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
  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  level: string;
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
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
  @Type(() => TargetLanguageDto)
  targetLanguages: TargetLanguageDto[];

  @IsString()
  @IsOptional()
  avatar?: string;
}
