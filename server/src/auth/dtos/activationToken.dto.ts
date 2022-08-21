import { IsEmail, IsString } from 'class-validator';

export class ActivationTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
