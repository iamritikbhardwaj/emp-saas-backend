import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateMusterDto {
  @IsDate()
  date!: Date;

  @IsBoolean()
  present!: boolean;

  @IsNumber()
  unitsWorked!: number;
}
