import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum RequestRole {
  LEARNER = 'LEARNER',
  MENTOR = 'MENTOR',
}

export class MatchCriteriaDto {
  @ApiProperty({
    example: 'LEARNER',
    description: 'Role of the user in the circle',
  })
  @IsEnum(RequestRole)
  @IsNotEmpty()
  role: RequestRole;

  @ApiProperty({
    example: 'ES',
    description:
      'Language code of the language(whether target or native) based on the user role',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    example: 'BEGINNER',
    description: 'Proficiency level in the specified language',
  })
  @IsString()
  @IsNotEmpty()
  level: string;
}
