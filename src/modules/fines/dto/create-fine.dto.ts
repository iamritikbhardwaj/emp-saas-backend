import { IsDate, IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

export class CreateFineDto {
  @IsString()
  reason!: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount!: number;

  @IsDate()
  date!: Date;
}
