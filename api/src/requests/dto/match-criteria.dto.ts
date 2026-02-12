import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum RequestRole {
  LEARNER = 'LEARNER',
  MENTOR = 'MENTOR',
}

export class MatchCriteriaDto {
  @ApiProperty({
    example: 'LEARNER',
    description: 'Role of the user in the circle',
    enum: RequestRole,
  })
  @Transform(({ value }: { value: any }): string =>
    (value as string)?.toUpperCase().trim(),
  )
  @IsEnum(RequestRole)
  @IsNotEmpty()
  role: RequestRole;

  @ApiProperty({
    example: 'ES',
    description:
      'Language code of the language (whether target or native) based on the user role',
  })
  @Transform(({ value }: { value: any }): string =>
    (value as string)?.toUpperCase().trim(),
  )
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    example: 'BEGINNER',
    description: 'Proficiency level in the specified language',
  })
  @Transform(({ value }: { value: any }): string =>
    (value as string)?.toUpperCase().trim(),
  )
  @IsString()
  @IsNotEmpty()
  level: string;
}
