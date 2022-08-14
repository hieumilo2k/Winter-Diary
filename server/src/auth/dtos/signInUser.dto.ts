import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
