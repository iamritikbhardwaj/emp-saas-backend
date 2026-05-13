import { IsArray, IsString } from 'class-validator';

export class CreateContractorDto {
  @IsString()
  name!: string;
  @IsString()
  address!: string;
  @IsArray()
  @IsString({ each: true })
  workSites!: string[];
}
