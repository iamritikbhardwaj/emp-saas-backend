import { IsEnum, IsOptional, IsString } from 'class-validator';

export const FormType = {
  FORM_XIII: 'FORM_XIII',
  FORM_XIV: 'FORM_XIV',
  FORM_XVI: 'FORM_XVI',
  FORM_XVII: 'FORM_XVII',
  FORM_XIX: 'FORM_XIX',
  FORM_XX: 'FORM_XX',
  FORM_XXI: 'FORM_XXI',
  FORM_XXII: 'FORM_XXII',
  FORM_XXIII: 'FORM_XXIII',
} as const;

export type FormType = (typeof FormType)[keyof typeof FormType];

export class ContractorInfoDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsString()
  workLocation!: string;

  @IsString()
  principalEmployer!: string;

  @IsString()
  principalEmployerAddress!: string;

  @IsString()
  establishmentName!: string;

  @IsString()
  establishmentAddress!: string;
}

export class GenerateReportDto {
  @IsEnum(FormType)
  formType!: FormType;

  contractorInfo!: ContractorInfoDto;

  @IsString()
  month!: string;

  @IsString()
  year!: string;

  @IsOptional()
  workers?: Array<Record<string, any>>;

  @IsOptional()
  wageData?: Array<Record<string, any>>;

  @IsOptional()
  attendanceData?: Array<Record<string, any>>;
}
