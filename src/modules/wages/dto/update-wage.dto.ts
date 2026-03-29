import { PartialType } from '@nestjs/mapped-types';
import { CreateWageDto } from './create-wage.dto';

export class UpdateWageDto extends PartialType(CreateWageDto) {}
