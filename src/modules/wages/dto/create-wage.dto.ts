import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateWageDto {
  @IsDate()
  date!: Date;

  @IsBoolean()
  present!: boolean;

  @IsNumber()
  unitsWorked!: number;
}
