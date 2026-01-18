import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum RequestRole {
  LEARNER = 'LEARNER',
  MENTOR = 'MENTOR',
}

export class MatchCriteriaDto {
  @IsEnum(RequestRole)
  @IsNotEmpty()
  role: RequestRole;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  level: string;
}
