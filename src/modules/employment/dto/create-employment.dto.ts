import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEmploymentDto {
  @IsString()
  workNature!: string;

  @IsNumber()
  wageRate!: number;

  @IsDate()
  fromDate!: Date;

  @IsDate()
  toDate!: Date;
}
