import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  circleId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  mediaUrl?: string;

  @IsString()
  @IsOptional()
  @IsEnum(['TEXT', 'IMAGE', 'SYSTEM'])
  messageType?: string;
}
