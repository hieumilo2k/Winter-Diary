import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/, {
    message:
      'Your password must be at least 5 characters including a lowercase letter, an uppercase letter, a number and a special character',
  })
  @IsOptional()
  password: string;
}
