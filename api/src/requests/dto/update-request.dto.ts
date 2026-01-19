import { PartialType } from '@nestjs/mapped-types';
import { CreateJoinRequestDto } from './create-join-request.dto';

export class UpdateRequestDto extends PartialType(CreateJoinRequestDto) {}
