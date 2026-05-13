import { IsString } from 'class-validator';

export class CreateWorksiteDto {
  @IsString()
  name!: string;

  @IsString()
  location!: string;
}
