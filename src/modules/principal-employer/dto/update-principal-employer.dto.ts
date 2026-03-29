import { PartialType } from '@nestjs/mapped-types';
import { CreatePrincipalEmployerDto } from './create-principal-employer.dto';

export class UpdatePrincipalEmployerDto extends PartialType(CreatePrincipalEmployerDto) {}
