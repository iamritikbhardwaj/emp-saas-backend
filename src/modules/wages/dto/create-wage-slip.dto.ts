import { IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

class CreateWageSlipDto {
  @IsString()
  employeeName!: string;

  @IsNumber()
  daysWorked!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  grossWages!: Double;

  @IsNumber({ maxDecimalPlaces: 2 })
  deductions!: Double;

  @IsNumber({ maxDecimalPlaces: 2 })
  netWages!: Double;
}
