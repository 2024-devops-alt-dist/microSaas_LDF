import { Type } from 'class-transformer';
import { IsNotEmpty, IsMongoId, ValidateNested } from 'class-validator';
import { MatchCriteriaDto } from './match-criteria.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJoinRequestDto {
  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
    description: 'Unique identifier of the circle to join',
  })
  @IsNotEmpty()
  @IsMongoId()
  circleId: string;

  @ApiProperty({
    description: 'Criteria for matching the user to the circle',
  })
  @ValidateNested()
  @Type(() => MatchCriteriaDto)
  matchCriteria: MatchCriteriaDto;
}
