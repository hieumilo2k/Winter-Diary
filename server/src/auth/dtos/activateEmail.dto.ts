import { IsString } from 'class-validator';

export class ActivateEmailDto {
  @IsString()
  activationToken: string;
}
