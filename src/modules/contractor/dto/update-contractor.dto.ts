import { PartialType } from '@nestjs/mapped-types';
import { CreateContractorDto } from './create-contractor.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateContractorDto extends PartialType(CreateContractorDto) {
  @IsString()
  @IsNotEmpty()
  id!: string;
}
