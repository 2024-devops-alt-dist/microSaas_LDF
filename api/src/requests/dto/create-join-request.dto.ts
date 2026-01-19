import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId, ValidateNested } from 'class-validator';
import { MatchCriteriaDto } from './match-criteria.dto';

export class CreateJoinRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  circleId: string;

  @ValidateNested()
  @Type(() => MatchCriteriaDto)
  matchCriteria: MatchCriteriaDto;
}
