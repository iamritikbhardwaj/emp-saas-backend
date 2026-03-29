import { PartialType } from '@nestjs/mapped-types';
import { CreateMusterDto } from './create-muster.dto';

export class UpdateMusterDto extends PartialType(CreateMusterDto) {}
