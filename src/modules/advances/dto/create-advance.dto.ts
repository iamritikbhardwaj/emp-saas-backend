import { IsDate, IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

export class CreateAdvanceDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount!: number;
  @IsString()
  purpose!: string;
  @IsDate()
  issuedDate!: Date;
  @IsNumber()
  installments!: number;
}
