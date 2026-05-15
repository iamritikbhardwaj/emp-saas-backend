import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContractorDto {
  // --- Company Information ---
  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber!: string;

  @IsString()
  @IsOptional()
  gstNumber?: string;

  @IsString()
  @IsNotEmpty()
  panNumber!: string;

  // --- Contact Information ---
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsOptional()
  alternatePhone?: string;

  // --- Address ---
  @IsString()
  @IsNotEmpty()
  addressLine1!: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  pincode!: string;

  // --- Primary Contact Person ---
  @IsString()
  @IsNotEmpty()
  contactPersonName!: string;

  @IsString()
  @IsNotEmpty()
  contactPersonDesignation!: string;

  @IsString()
  @IsNotEmpty()
  contactPersonPhone!: string;

  @IsEmail()
  contactPersonEmail!: string;

  // --- Subscription ---
  @IsString()
  @IsNotEmpty()
  subscriptionPlan!: string;

  // --- Additional ---
  @IsNumber()
  @Min(0)
  @Type(() => Number) // Ensures the input is treated as a number
  numberOfSites!: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  estimatedWorkers!: number;

  @IsString()
  @IsNotEmpty()
  industryType!: string;
}
