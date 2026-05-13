import { IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

class CreateDeductionDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  amount!: number;

  @IsString()
  type!: string;
}

export default CreateDeductionDto;
