import { IsString } from 'class-validator';

export class CreatePrincipalEmployerDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;
}
