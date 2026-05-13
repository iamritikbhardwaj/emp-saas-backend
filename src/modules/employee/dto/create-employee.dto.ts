import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  fatherName!: string;

  @IsEnum(['Male', 'Female', 'Other'], {
    message: 'Gender must be Male, Female, or Other',
  })
  gender!: string;

  @IsDateString() // Validates ISO 8601 date strings
  @IsOptional()
  dob?: Date;

  @IsString()
  @IsOptional()
  identificationMark?: string;

  @IsString()
  @IsOptional()
  uan?: string;

  @IsString()
  @IsOptional()
  esic?: string;
}
